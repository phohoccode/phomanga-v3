"use client";

const DescriptionTitle = ({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span>{title}</span>
    </div>
  );
};

export default DescriptionTitle;
