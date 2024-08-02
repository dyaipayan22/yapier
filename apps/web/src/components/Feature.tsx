export const Feature = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="flex items-center gap-1.5">
      <Check />
      <div className="flex items-center gap-1.5">
        <span className="font-bold">{title}</span>
        <span>{subtitle}</span>
      </div>
    </div>
  );
};

function Check() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="size-5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  );
}
