import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  status?: "completed" | "in-progress" | "coming-soon";
  teamSize?: number;
  link?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  tags = [],
  status = "completed",
  teamSize,
  link,
}) => {
  return (
    <Card className="overflow-hidden">
      {image && (
        <div className="aspect-video bg-gray-100 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <div className="flex items-center gap-2">
            {status === "completed" && (
              <Badge variant="success">Completed</Badge>
            )}
            {status === "in-progress" && (
              <Badge variant="warning">In Progress</Badge>
            )}
            {status === "coming-soon" && (
              <Badge variant="info">Coming Soon</Badge>
            )}

            {teamSize && (
              <div className="flex items-center gap-1">
                {[...Array(teamSize)].map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 bg-emerald-500 rounded-full border-2 border-white -ml-1 first:ml-0"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {link && (
          <div className="pt-4 border-t border-gray-100">
            <a
              href={link}
              className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-2 group"
            >
              Read case study
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        )}
      </div>
    </Card>
  );
};
