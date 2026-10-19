'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { CheckCircle2, LoaderCircle, RotateCcw, Send } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { trackContactFormStarted, trackContactFormSubmit } from '@/lib/analytics';
import { cn } from '@/lib/utils';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const successConfirmationDuration = 4_000;

interface FieldErrors {
  email?: string;
  message?: string;
}

export function ContactForm() {
  const shouldReduceMotion = useReducedMotion();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmingSuccess, setIsConfirmingSuccess] = useState(false);
  const formStartedRef = useRef(false);
  const successTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        window.clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  const handleFormFocus = () => {
    if (formStartedRef.current) {
      return;
    }

    formStartedRef.current = true;
    trackContactFormStarted();
  };

  const validate = () => {
    const errors: FieldErrors = {};
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedEmail) {
      errors.email = 'Enter your email address.';
    } else if (!emailPattern.test(trimmedEmail)) {
      errors.email = 'Enter a valid email address.';
    }

    if (!trimmedMessage) {
      errors.message = 'Enter a message before sending.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const dismissSuccess = () => {
    if (successTimeoutRef.current) {
      window.clearTimeout(successTimeoutRef.current);
      successTimeoutRef.current = null;
    }

    setIsConfirmingSuccess(false);
  };

  const showSuccess = () => {
    setIsSubmitting(false);
    setMessage('');
    setIsConfirmingSuccess(true);
    successTimeoutRef.current = window.setTimeout(() => {
      successTimeoutRef.current = null;
      setIsConfirmingSuccess(false);
    }, successConfirmationDuration);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!validate()) {
      return;
    }

    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      trackContactFormSubmit('error', 'webhook_not_configured');
      setError('Contact delivery is not configured. Please use one of the contact channels instead.');
      return;
    }

    setIsSubmitting(true);

    try {
      const isDemoMode =
        process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_CONTACT_FORM_DEMO_MODE === 'true';

      if (isDemoMode) {
        await new Promise((resolve) => window.setTimeout(resolve, 800));
        showSuccess();
        return;
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          b_address: honeypot,
        }),
      });

      if (!response.ok) {
        trackContactFormSubmit('error', `webhook_${response.status}`);
        setError('Your message could not be sent. Please try again or use another contact channel.');
        return;
      }

      trackContactFormSubmit('success');
      showSuccess();
    } catch {
      trackContactFormSubmit('error', 'webhook_request_failed');
      setError('Your message could not be sent. Check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormLocked = isSubmitting;
  const buttonTransition = { duration: shouldReduceMotion ? 0 : 0.35, ease: 'easeOut' as const };
  const buttonState = isSubmitting ? 'submitting' : isConfirmingSuccess ? 'sent' : error ? 'retry' : 'default';

  return (
    <form
      className="mt-10 grid flex-1 content-start gap-5"
      aria-describedby={error ? 'contact-form-error' : undefined}
      noValidate
      onFocus={handleFormFocus}
      onSubmit={handleSubmit}
    >
      <fieldset
        disabled={isFormLocked}
        aria-busy={isSubmitting}
        className={cn(
          'm-0 grid min-w-0 gap-5 border-0 p-0 transition-opacity',
          isFormLocked && 'opacity-50',
        )}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-foreground">
            Your name
            <Input
              name="name"
              autoComplete="name"
              value={name}
              onChange={(event) => {
                dismissSuccess();
                setName(event.target.value);
              }}
              placeholder="Jane Smith"
              className="h-11 bg-background/60 px-3"
            />
            <span className="min-h-5 text-sm font-normal" aria-hidden="true" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-foreground">
            Email address
            <Input
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => {
                dismissSuccess();
                setEmail(event.target.value);
              }}
              placeholder="jane@company.com"
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
              className={cn(
                'h-11 bg-background/60 px-3',
                fieldErrors.email && 'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20',
              )}
            />
            <span
              id={fieldErrors.email ? 'contact-email-error' : undefined}
              className="min-h-5 text-sm font-normal text-destructive"
            >
              {fieldErrors.email}
            </span>
          </label>
        </div>

        <label className="grid gap-2 text-sm font-medium text-foreground">
          Your message
          <textarea
            name="message"
            rows={6}
            value={message}
            onChange={(event) => {
              dismissSuccess();
              setMessage(event.target.value);
            }}
            placeholder="Tell me a little about what you have in mind..."
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
            className={cn(
              'min-h-40 w-full resize-y rounded-lg border border-input bg-background/60 px-3 py-2.5 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
              fieldErrors.message && 'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20',
            )}
          />
          <span
            id={fieldErrors.message ? 'contact-message-error' : undefined}
            className="min-h-5 text-sm font-normal text-destructive"
          >
            {fieldErrors.message}
          </span>
        </label>

        <div className="sr-only" aria-hidden="true">
          <label htmlFor="b_address">Address</label>
          <input
            id="b_address"
            name="b_address"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </div>
      </fieldset>

      {error && (
        <p id="contact-form-error" className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <div className="mt-2 flex flex-col items-end">
        <Button
          type="submit"
          size="lg"
          disabled={isFormLocked}
          className={cn(
            'w-full transition-colors duration-500 ease-out sm:w-auto',
            isConfirmingSuccess && 'bg-emerald-600 text-white hover:bg-emerald-600 disabled:opacity-100',
          )}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={buttonState}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
              transition={buttonTransition}
              className="inline-flex items-center gap-1.5"
            >
              {isSubmitting ? (
                <>
                  Sending...
                  <LoaderCircle className="animate-spin" aria-hidden="true" />
                </>
              ) : isConfirmingSuccess ? (
                <>
                  Sent
                  <CheckCircle2 aria-hidden="true" />
                </>
              ) : (
                <>
                  {error ? 'Try again' : 'Send message'}
                  {error ? <RotateCcw aria-hidden="true" /> : <Send aria-hidden="true" />}
                </>
              )}
            </motion.span>
          </AnimatePresence>
        </Button>
        <div className="mt-2 min-h-5 text-right">
          <AnimatePresence initial={false}>
            {isConfirmingSuccess && (
              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -2 }}
                transition={buttonTransition}
                className="text-sm text-emerald-700 dark:text-emerald-300"
                role="status"
              >
                You may send another message.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <span className="sr-only" role="status">
          {isConfirmingSuccess ? 'Your message has been sent.' : ''}
        </span>
      </div>
    </form>
  );
}
