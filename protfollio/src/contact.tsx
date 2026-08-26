import React, { useEffect, useState } from 'react';
import { client } from '../public/lib/sanity';
import emailjs from 'emailjs-com';

interface ContactData {
  email: string;
  location: string;
  phone: string;
  socialLinks: Array<{
    platform: string;
    url: string;
    icon: string;
    color: string;
  }>;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    client
      .fetch(`*[_type == "contact"][0]`)
      .then((data) => setContactData(data))
      .catch(console.error);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_name: 'Ranees K',
    };

    const serviceId = 'service_770dxl5';
    const templateId = 'template_jhw49w5';
    const userId = 'Y-0wMi52NGLVvfvbA';

    emailjs
      .send(serviceId, templateId, templateParams, userId)
      .then(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      })
      .catch(() => {
        setIsSubmitting(false);
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      });
  };

  if (!contactData) {
    return (
      <section
        id="contact"
        className="flex min-h-[50vh] items-center justify-center bg-surface px-4 py-24"
      >
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border border-line border-t-accent" />
          <p className="font-sans text-sm text-muted">Loading contact…</p>
        </div>
      </section>
    );
  }

  const inputClass =
    'w-full border-0 border-b border-line bg-transparent px-0 py-3 font-sans text-base font-light text-ink placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-0 transition-colors';

  return (
    <section id="contact" className="relative overflow-hidden bg-surface py-20 sm:py-28 lg:py-32">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-[radial-gradient(ellipse_at_left,rgba(47,74,63,0.05),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-sans text-[0.7rem] font-medium uppercase tracking-elegant text-accent">
            Contact
          </p>
          <h2 className="mt-3 font-display text-4xl font-medium leading-tight text-ink sm:text-5xl lg:text-6xl">
            Let’s begin a conversation
          </h2>
          <div className="mt-5 h-px w-14 bg-accent" />
          <p className="mt-6 font-sans text-base font-light text-muted sm:text-lg">
            Share a little about your project — I’ll respond with care.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <aside className="space-y-10 lg:col-span-4">
            <div>
              <p className="font-sans text-[0.65rem] font-medium uppercase tracking-elegant text-muted">
                Email
              </p>
              <a
                href={`mailto:${contactData.email}`}
                className="mt-2 inline-block font-display text-xl text-ink transition-colors hover:text-accent sm:text-2xl"
              >
                {contactData.email}
              </a>
            </div>

            {contactData.phone && (
              <div>
                <p className="font-sans text-[0.65rem] font-medium uppercase tracking-elegant text-muted">
                  Phone
                </p>
                <a
                  href={`tel:${contactData.phone}`}
                  className="mt-2 inline-block font-display text-xl text-ink transition-colors hover:text-accent sm:text-2xl"
                >
                  {contactData.phone}
                </a>
              </div>
            )}

            {contactData.location && (
              <div>
                <p className="font-sans text-[0.65rem] font-medium uppercase tracking-elegant text-muted">
                  Location
                </p>
                <p className="mt-2 font-display text-xl text-ink sm:text-2xl">
                  {contactData.location}
                </p>
              </div>
            )}

            {contactData.socialLinks?.length > 0 && (
              <div>
                <p className="font-sans text-[0.65rem] font-medium uppercase tracking-elegant text-muted">
                  Elsewhere
                </p>
                <div className="mt-4 flex flex-wrap gap-5">
                  {contactData.socialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-[0.7rem] font-medium uppercase tracking-elegant text-ink transition-colors hover:text-accent"
                    >
                      {social.platform}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>

          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="font-sans text-[0.65rem] font-medium uppercase tracking-elegant text-muted"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="font-sans text-[0.65rem] font-medium uppercase tracking-elegant text-muted"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="font-sans text-[0.65rem] font-medium uppercase tracking-elegant text-muted"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className={inputClass}
                  placeholder="Project inquiry"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="font-sans text-[0.65rem] font-medium uppercase tracking-elegant text-muted"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell me about your project…"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-12 min-w-[180px] items-center justify-center bg-accent px-8 font-sans text-[0.7rem] font-medium uppercase tracking-elegant text-surface transition-colors duration-300 hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? 'Sending…' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <p className="font-sans text-sm text-accent">
                  Message sent successfully. Thank you.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="font-sans text-sm text-red-700">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>

        <footer className="mt-20 border-t border-line pt-8 sm:mt-28">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="font-display text-lg text-ink">
              Ranees<span className="text-accent">.</span>K
            </p>
            <p className="font-sans text-xs font-light text-muted">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
