type ChipProps = {
  text: string;
  color?: string; // e.g. "blue", "green", "red"
  className?: string;
};

const colorMap: Record<string, { bg: string; text: string }> = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-800' },
  green: { bg: 'bg-green-100', text: 'text-green-800' },
  red: { bg: 'bg-red-100', text: 'text-red-800' },
  secondary: { bg: 'bg-slate-200', text: 'text-slate-800' },
};

export default function Chip({
  text,
  color = 'blue',
  className = '',
}: ChipProps) {
  const { bg, text: textColor } = colorMap[color] || colorMap.blue;
  return (
    <span
      className={`inline-block ${bg} ${textColor} text-sm px-4 py-1 rounded-full mr-1 mb-1 ${className}`}
    >
      {text}
    </span>
  );
}
