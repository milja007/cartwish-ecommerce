import "./Pagination.css";

interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  onClick: (page: number) => void;
  currentPage: number | string;
}

const Pagination = ({
  totalPosts,
  postsPerPage,
  onClick,
  currentPage,
}: PaginationProps) => {
  const pages: number[] = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <>
      {pages.length > 1 && (
        <ul className="pagination">
          {pages.map((page) => (
            <li key={page}>
              <button
                className={
                  parseInt(currentPage as string) === page
                    ? "pagination_button active"
                    : "pagination_button"
                }
                onClick={() => onClick(page)}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Pagination;
