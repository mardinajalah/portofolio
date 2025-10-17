interface GithubStatsProps {
  src: string
  isDark: boolean
}

const GithubStats: React.FC<GithubStatsProps> = ({src, isDark}) => {
  return (
    <img
      src={src}
      alt='GitHub Stats'
      className={`rounded-xl w-full sm:w-[380px] md:w-[420px] border 
        ${isDark ? 'border-gray-700/70' : 'border-gray-300'}
      `}
    />
  )
}

export default GithubStats