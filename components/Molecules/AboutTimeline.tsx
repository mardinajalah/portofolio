'use client';

interface TimelineItem {
  title: string;
  description: string;
}

interface AboutTimelineProps {
  isDark: boolean;
  items: TimelineItem[];
}

const AboutTimeline = ({ isDark, items }: AboutTimelineProps) => {
  return (
    <div
      className={`
        p-5 rounded-xl backdrop-blur-xl border shadow-md
        ${isDark ? 'bg-gray-800/20 border-gray-700/40' : 'bg-white/20 border-white/30'}
      `}
    >
      <div className='space-y-5'>
        {items.map((item, index) => (
          <div
            key={item.title}
            className='relative pl-8'
          >
            <span className='absolute left-0 top-1.5 w-3 h-3 rounded-full bg-blue-500' />
            {index !== items.length - 1 && <span className='absolute left-1.25 top-6 w-0.5 h-full bg-gray-300 dark:bg-gray-700' />}
            <h3 className='font-semibold'>{item.title}</h3>
            <p className='mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400'>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutTimeline;
