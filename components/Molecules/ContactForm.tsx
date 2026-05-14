'use client';

import { FormEvent, useState } from 'react';
import { Send } from 'lucide-react';

interface ContactFormProps {
  isDark: boolean;
}

const ContactForm = ({ isDark }: ContactFormProps) => {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSent(true);
  };

  const inputClassName = `
    w-full px-4 py-3 rounded-lg outline-none border transition
    ${isDark ? 'bg-gray-900/30 border-gray-700/60 focus:border-blue-400 placeholder:text-gray-500' : 'bg-white/40 border-white/50 focus:border-blue-500 placeholder:text-gray-500'}
  `;

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        p-5 rounded-xl backdrop-blur-xl border shadow-md
        ${isDark ? 'bg-gray-800/20 border-gray-700/40' : 'bg-white/20 border-white/30'}
      `}
    >
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div>
          <label
            htmlFor='name'
            className='text-sm font-semibold'
          >
            Name
          </label>
          <input
            id='name'
            name='name'
            type='text'
            placeholder='Your name'
            className={`${inputClassName} mt-2`}
          />
        </div>

        <div>
          <label
            htmlFor='email'
            className='text-sm font-semibold'
          >
            Email
          </label>
          <input
            id='email'
            name='email'
            type='email'
            placeholder='your@email.com'
            className={`${inputClassName} mt-2`}
          />
        </div>
      </div>

      <div className='mt-4'>
        <label
          htmlFor='subject'
          className='text-sm font-semibold'
        >
          Subject
        </label>
        <input
          id='subject'
          name='subject'
          type='text'
          placeholder='Project discussion'
          className={`${inputClassName} mt-2`}
        />
      </div>

      <div className='mt-4'>
        <label
          htmlFor='message'
          className='text-sm font-semibold'
        >
          Message
        </label>
        <textarea
          id='message'
          name='message'
          rows={6}
          placeholder='Tell me about your idea'
          className={`${inputClassName} mt-2 resize-none`}
        />
      </div>

      <div className='mt-5 flex flex-col sm:flex-row sm:items-center gap-3'>
        <button
          type='submit'
          className='w-full sm:w-auto inline-flex items-center justify-center gap-2 font-semibold px-4 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all shadow-md cursor-pointer'
        >
          <Send size={18} />
          Send Message
        </button>
        {isSent && <p className='text-sm text-blue-500'>Message preview submitted. Backend integration can be added next.</p>}
      </div>
    </form>
  );
};

export default ContactForm;
