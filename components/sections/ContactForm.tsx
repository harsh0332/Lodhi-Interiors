"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { trackFormStart, trackFormSubmit } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { env } from "@/lib/env";

interface FormDataState {
  name: string;
  phone: string;
  preferWhatsApp: boolean;
  email: string;
  locality: string;
  projectType: string;
  scope: string;
  areaSqft: string;
  startTimeline: string;
  budgetRange: string;
  notes: string;
  _hp_website: string;
}

const INITIAL_STATE: FormDataState = {
  name: "",
  phone: "",
  preferWhatsApp: true,
  email: "",
  locality: "",
  projectType: "Home interiors",
  scope: "Design and execution (turnkey)",
  areaSqft: "",
  startTimeline: "Within 3 months",
  budgetRange: "Prefer to discuss",
  notes: "",
  _hp_website: "",
};

export function ContactForm({
  deliveryEnabled = false,
}: {
  deliveryEnabled?: boolean;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormDataState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStarted, setFormStarted] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    const selected = new URLSearchParams(window.location.search).get("project");
    const allowed = [
      "Home interiors",
      "Luxury home or villa",
      "Modular kitchen",
      "Office",
      "Retail or showroom",
      "Restaurant or hospitality",
      "Other",
    ];
    if (selected && allowed.includes(selected))
      setFormData((current) => ({ ...current, projectType: selected }));
  }, []);

  const projectInputRef = useRef<HTMLSelectElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const localityInputRef = useRef<HTMLInputElement>(null);

  const handleFieldChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (!formStarted) {
      setFormStarted(true);
      trackFormStart();
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateStep1 = (): boolean => {
    const stepErrors: Record<string, string> = {};

    if (formData.name.trim().length < 2) {
      stepErrors.name = "Full name must contain at least 2 characters.";
    }

    const cleanPhone = formData.phone.trim().replace(/[\s\-()]/g, "");
    const indianPhoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;
    if (!cleanPhone || !indianPhoneRegex.test(cleanPhone)) {
      stepErrors.phone =
        "Valid 10-digit Indian mobile number required (e.g. 98765 43210).";
    }

    if (formData.locality.trim().length < 2) {
      stepErrors.locality = "Specify location (e.g. Arera Colony, Bhopal).";
    }

    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      stepErrors.email = "Enter a valid email address or leave it blank.";
    }
    setErrors(stepErrors);

    if (stepErrors.name) {
      nameInputRef.current?.focus();
    } else if (stepErrors.phone) {
      phoneInputRef.current?.focus();
    } else if (stepErrors.locality) {
      localityInputRef.current?.focus();
    } else if (stepErrors.email) {
      emailInputRef.current?.focus();
    }

    return Object.keys(stepErrors).length === 0;
  };

  const scrollToForm = () => {
    requestAnimationFrame(() =>
      nameInputRef.current
        ?.closest("form")
        ?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
          block: "start",
        }),
    );
  };

  const handleNextStep = (e: React.MouseEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
      requestAnimationFrame(() =>
        projectInputRef.current?.focus({ preventScroll: true }),
      );
      scrollToForm();
    }
  };

  const handleBackStep = (e: React.MouseEvent) => {
    e.preventDefault();
    setStep(1);
    requestAnimationFrame(() =>
      nameInputRef.current?.focus({ preventScroll: true }),
    );
    scrollToForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Enter on step one advances the form; it never sends an enquiry.
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
        requestAnimationFrame(() =>
          projectInputRef.current?.focus({ preventScroll: true }),
        );
        scrollToForm();
      }
      return;
    }

    // Validate Step 1 first
    if (!validateStep1()) {
      setStep(1);
      return;
    }

    if (!deliveryEnabled) {
      const brief = [
        "Hello Soumya, I would like to discuss an interior project.",
        `Name: ${formData.name.trim()}`,
        `Phone: ${formData.phone.trim()}`,
        `Location: ${formData.locality.trim()}`,
        `Project: ${formData.projectType}`,
        `Scope: ${formData.scope}`,
        `Budget: ${formData.budgetRange}`,
        `Timing: ${formData.startTimeline}`,
        formData.areaSqft ? `Area: ${formData.areaSqft}` : "",
        formData.email ? `Email: ${formData.email}` : "",
        formData.notes ? `Notes: ${formData.notes}` : "",
      ]
        .filter(Boolean)
        .join("\n");
      window.location.assign(
        `https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(brief)}`,
      );
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        if (data?.fieldErrors) {
          setErrors(data.fieldErrors);
          if (data.fieldErrors.email) {
            setStep(1);
          }
          if (data.fieldErrors.name) {
            setStep(1);
            nameInputRef.current?.focus();
          } else if (data.fieldErrors.phone) {
            setStep(1);
            phoneInputRef.current?.focus();
          } else if (data.fieldErrors.locality) {
            setStep(1);
            localityInputRef.current?.focus();
          }
        }
        setServerError(
          data?.error ||
            "Unable to submit your details. Please reach out via WhatsApp.",
        );
        setIsSubmitting(false);
        return;
      }

      // Track analytics event (zero PII: projectType and budgetRange only)
      trackFormSubmit(formData.projectType, formData.budgetRange);

      // Redirect on success
      router.push("/thank-you");
    } catch {
      setServerError(
        "A network connection error occurred. Please message Soumya directly on WhatsApp.",
      );
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="project-enquiry border border-greige/30 bg-bone p-6 shadow-none sm:p-8 md:p-10"
      aria-label="Start your interior project inquiry"
    >
      {/* Live Region for Screen Readers */}
      <div role="alert" aria-live="assertive" className="sr-only">
        {serverError ||
          (Object.keys(errors).length > 0
            ? "The form has validation errors."
            : "")}
      </div>

      {/* Server Error Alert */}
      {serverError && (
        <div className="mb-8 border-l-2 border-red-700 bg-red-50/70 p-4 font-sans text-xs leading-relaxed text-red-900">
          <span className="mb-1 block font-mono font-semibold uppercase tracking-wider">
            Notice
          </span>
          {serverError}
          <a
            href={`https://wa.me/${env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block underline"
          >
            Contact the studio on WhatsApp ↗
          </a>
        </div>
      )}

      {/* Hidden Honeypot Field for Spam Bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="_hp_website">Do not fill this field</label>
        <input
          type="text"
          id="_hp_website"
          name="_hp_website"
          value={formData._hp_website}
          onChange={handleFieldChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Two clear steps on every screen size. */}
      <div
        className="enquiry-progress mb-8 border-b border-greige/30 pb-4"
        aria-live="polite"
      >
        <div className="mb-2 flex items-center justify-between font-mono text-ui-caption text-greige">
          <span>
            {step === 1
              ? "Step 1 of 2: Contact"
              : "Step 2 of 2: Project details"}
          </span>
          <span className="font-medium text-accent">
            {step === 1 ? "01 / 02" : "02 / 02"}
          </span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-paper">
          <div
            className="h-full bg-accent transition-all duration-300"
            style={{ width: step === 1 ? "50%" : "100%" }}
          />
        </div>
      </div>

      {/* STEP 1: Contact Details & Locality */}
      <div className={cn("space-y-6", step === 2 ? "hidden" : "block")}>
        <div className="mb-6 border-b border-greige/20 pb-2">
          <span className="block font-mono text-ui-caption uppercase tracking-wider text-accent">
            01 · About you
          </span>
          <h2 className="font-serif text-[1.25rem] font-normal text-charcoal">
            Let’s get acquainted
          </h2>
        </div>

        {/* Full Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block font-sans text-ui-caption font-medium uppercase tracking-[0.06em] text-charcoal"
          >
            Full name <span className="text-accent">*</span>
          </label>
          <input
            ref={nameInputRef}
            type="text"
            id="name"
            name="name"
            required
            autoComplete="name"
            value={formData.name}
            onChange={handleFieldChange}
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-invalid={Boolean(errors.name)}
            placeholder="Your name"
            className={cn(
              "min-h-[46px] w-full rounded-sm border bg-paper/50 px-4 font-sans text-[1rem] text-charcoal transition-colors",
              errors.name
                ? "border-red-600 focus:ring-2 focus:ring-red-600"
                : "border-greige/40 focus:border-charcoal focus:bg-bone focus:ring-2 focus:ring-accent",
              "focus:outline-none",
            )}
          />
          {errors.name && (
            <p
              id="name-error"
              className="mt-1.5 font-sans text-xs text-red-700"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block font-sans text-ui-caption font-medium uppercase tracking-[0.06em] text-charcoal"
          >
            Phone number (Indian mobile) <span className="text-accent">*</span>
          </label>
          <input
            ref={phoneInputRef}
            type="tel"
            inputMode="numeric"
            id="phone"
            name="phone"
            required
            autoComplete="tel"
            value={formData.phone}
            onChange={handleFieldChange}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            aria-invalid={Boolean(errors.phone)}
            placeholder="e.g. 98765 43210"
            className={cn(
              "min-h-[46px] w-full rounded-sm border bg-paper/50 px-4 font-sans text-[1rem] text-charcoal transition-colors",
              errors.phone
                ? "border-red-600 focus:ring-2 focus:ring-red-600"
                : "border-greige/40 focus:border-charcoal focus:bg-bone focus:ring-2 focus:ring-accent",
              "focus:outline-none",
            )}
          />
          {errors.phone && (
            <p
              id="phone-error"
              className="mt-1.5 font-sans text-xs text-red-700"
            >
              {errors.phone}
            </p>
          )}

          {/* Prefer WhatsApp Checkbox */}
          <div className="mt-3 flex items-center gap-2.5">
            <input
              type="checkbox"
              id="preferWhatsApp"
              name="preferWhatsApp"
              checked={formData.preferWhatsApp}
              onChange={handleFieldChange}
              className="h-4 w-4 rounded-sm border-greige/40 text-charcoal accent-accent focus:ring-accent"
            />
            <label
              htmlFor="preferWhatsApp"
              className="select-none font-sans text-xs text-charcoal/85"
            >
              You can contact me on WhatsApp
            </label>
          </div>
        </div>

        {/* Email Address (Optional) */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block font-sans text-ui-caption font-medium uppercase tracking-[0.06em] text-charcoal"
          >
            Email address{" "}
            <span className="font-normal lowercase text-greige">
              (optional)
            </span>
          </label>
          <input
            ref={emailInputRef}
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleFieldChange}
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={Boolean(errors.email)}
            placeholder="you@example.com"
            className={cn(
              "min-h-[46px] w-full rounded-sm border bg-paper/50 px-4 font-sans text-[1rem] text-charcoal transition-colors",
              errors.email
                ? "border-red-600 focus:ring-2 focus:ring-red-600"
                : "border-greige/40 focus:border-charcoal focus:bg-bone focus:ring-2 focus:ring-accent",
              "focus:outline-none",
            )}
          />
          {errors.email && (
            <p
              id="email-error"
              className="mt-1.5 font-sans text-xs text-red-700"
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* Locality / Where is the space */}
        <div>
          <label
            htmlFor="locality"
            className="mb-2 block font-sans text-ui-caption font-medium uppercase tracking-[0.06em] text-charcoal"
          >
            Where is the space? <span className="text-accent">*</span>
          </label>
          <input
            ref={localityInputRef}
            type="text"
            id="locality"
            name="locality"
            required
            value={formData.locality}
            onChange={handleFieldChange}
            aria-describedby={errors.locality ? "locality-error" : undefined}
            aria-invalid={Boolean(errors.locality)}
            placeholder="e.g. Arera Colony, Bhopal"
            className={cn(
              "min-h-[46px] w-full rounded-sm border bg-paper/50 px-4 font-sans text-[1rem] text-charcoal transition-colors",
              errors.locality
                ? "border-red-600 focus:ring-2 focus:ring-red-600"
                : "border-greige/40 focus:border-charcoal focus:bg-bone focus:ring-2 focus:ring-accent",
              "focus:outline-none",
            )}
          />
          {errors.locality && (
            <p
              id="locality-error"
              className="mt-1.5 font-sans text-xs text-red-700"
            >
              {errors.locality}
            </p>
          )}
        </div>

        {/* Continue to the project brief. */}
        <div className="pt-4">
          <Button
            type="button"
            variant="primary"
            tone="light"
            onClick={handleNextStep}
            className="min-h-[48px] w-full justify-center text-xs uppercase tracking-wider active:scale-[0.99]"
          >
            Next: Project Details &rarr;
          </Button>
        </div>
      </div>

      {/* STEP 2: Project Specifications & Budget */}
      <div className={cn("space-y-6", step === 1 ? "hidden" : "block")}>
        <div className="mb-6 border-b border-greige/20 pb-2">
          <span className="block font-mono text-ui-caption uppercase tracking-wider text-accent">
            02 · About your project
          </span>
          <h2 className="font-serif text-[1.25rem] font-normal text-charcoal">
            A little about your space
          </h2>
        </div>

        {/* Two-column grid on desktop */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Project Typology */}
          <div>
            <label
              htmlFor="projectType"
              className="mb-2 block font-sans text-ui-caption font-medium uppercase tracking-[0.06em] text-charcoal"
            >
              Project type <span className="text-accent">*</span>
            </label>
            <select
              ref={projectInputRef}
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleFieldChange}
              className="min-h-[46px] w-full rounded-sm border border-greige/40 bg-paper/50 px-3 font-sans text-[1rem] text-charcoal focus:border-charcoal focus:bg-bone focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="Home interiors">
                Home interiors (Apartments &amp; Residences)
              </option>
              <option value="Luxury home or villa">Luxury home or villa</option>
              <option value="Modular kitchen">Modular kitchen</option>
              <option value="Office">Office or workspace</option>
              <option value="Retail or showroom">Retail or showroom</option>
              <option value="Restaurant or hospitality">
                Restaurant or hospitality
              </option>
              <option value="Other">Something else</option>
            </select>
          </div>

          {/* Scope */}
          <div>
            <label
              htmlFor="scope"
              className="mb-2 block font-sans text-ui-caption font-medium uppercase tracking-[0.06em] text-charcoal"
            >
              How can we help? <span className="text-accent">*</span>
            </label>
            <select
              id="scope"
              name="scope"
              value={formData.scope}
              onChange={handleFieldChange}
              className="min-h-[46px] w-full rounded-sm border border-greige/40 bg-paper/50 px-3 font-sans text-[1rem] text-charcoal focus:border-charcoal focus:bg-bone focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="Design and execution (turnkey)">
                Design and execution (turnkey)
              </option>
              <option value="Design only">
                Design &amp; technical drawings only
              </option>
              <option value="Not sure yet">I’d like your advice</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Approximate Size in Sqft */}
          <div>
            <label
              htmlFor="areaSqft"
              className="mb-2 block font-sans text-ui-caption font-medium uppercase tracking-[0.06em] text-charcoal"
            >
              Approximate area{" "}
              <span className="font-normal lowercase text-greige">
                (optional)
              </span>
            </label>
            <input
              type="text"
              id="areaSqft"
              name="areaSqft"
              value={formData.areaSqft}
              onChange={handleFieldChange}
              placeholder="e.g. 3,500 sq.ft."
              className="min-h-[46px] w-full rounded-sm border border-greige/40 bg-paper/50 px-4 font-sans text-[1rem] text-charcoal focus:border-charcoal focus:bg-bone focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Start Timeline */}
          <div>
            <label
              htmlFor="startTimeline"
              className="mb-2 block font-sans text-ui-caption font-medium uppercase tracking-[0.06em] text-charcoal"
            >
              When do you want to start? <span className="text-accent">*</span>
            </label>
            <select
              id="startTimeline"
              name="startTimeline"
              value={formData.startTimeline}
              onChange={handleFieldChange}
              className="min-h-[46px] w-full rounded-sm border border-greige/40 bg-paper/50 px-3 font-sans text-[1rem] text-charcoal focus:border-charcoal focus:bg-bone focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="Immediately">Immediately</option>
              <option value="Within 3 months">Within 3 months</option>
              <option value="Later this year">Later this year</option>
              <option value="Just exploring">Just exploring</option>
            </select>
          </div>
        </div>

        {/* Indicative Budget Range */}
        <div>
          <label
            htmlFor="budgetRange"
            className="mb-2 block font-sans text-ui-caption font-medium uppercase tracking-[0.06em] text-charcoal"
          >
            Your budget range <span className="text-accent">*</span>
          </label>
          <select
            id="budgetRange"
            name="budgetRange"
            value={formData.budgetRange}
            onChange={handleFieldChange}
            className="min-h-[46px] w-full rounded-sm border border-greige/40 bg-paper/50 px-3 font-sans text-[1rem] text-charcoal focus:border-charcoal focus:bg-bone focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="₹15L — ₹30L">₹15L — ₹30L</option>
            <option value="₹30L — ₹60L">₹30L — ₹60L</option>
            <option value="₹60L — ₹1.2 Cr">₹60L — ₹1.2 Cr</option>
            <option value="₹1.2 Cr+">₹1.2 Cr+</option>
            <option value="Prefer to discuss">
              Prefer to discuss in person
            </option>
          </select>
          <p className="mt-1.5 font-sans text-ui-caption text-greige">
            An approximate range is helpful. We can discuss the details
            together.
          </p>
        </div>

        {/* Notes / Anything Else */}
        <div>
          <label
            htmlFor="notes"
            className="mb-2 block font-sans text-ui-caption font-medium uppercase tracking-[0.06em] text-charcoal"
          >
            Anything else?{" "}
            <span className="font-normal lowercase text-greige">
              (optional)
            </span>
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={formData.notes}
            onChange={handleFieldChange}
            placeholder="What do you have in mind for your space?"
            className="w-full resize-y rounded-sm border border-greige/40 bg-paper/50 p-4 font-sans text-[1rem] text-charcoal focus:border-charcoal focus:bg-bone focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {!deliveryEnabled && (
          <p className="text-sm leading-relaxed text-greige">
            Your project details will open as a draft in WhatsApp. Review and
            send it to start the conversation.
          </p>
        )}
        {/* Action Controls */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-greige/20 pt-6 sm:flex-row">
          {/* Back preserves all entered details. */}
          <button
            type="button"
            onClick={handleBackStep}
            className="order-2 font-sans text-xs text-greige transition-colors hover:text-charcoal sm:order-1"
          >
            &larr; Back to Contact Details
          </button>

          <Button
            type="submit"
            disabled={isSubmitting}
            variant="primary"
            tone="light"
            className="order-1 min-h-[50px] w-full justify-center px-10 text-[0.9375rem] active:scale-[0.99] sm:order-2 sm:w-auto"
          >
            {isSubmitting
              ? "Sending your enquiry…"
              : deliveryEnabled
                ? "Send enquiry"
                : "Continue on WhatsApp"}
          </Button>
        </div>
      </div>
    </form>
  );
}
