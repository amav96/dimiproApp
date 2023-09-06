import React from "react";
import { Button } from "@package";
import iconNext from "./icon-next.svg";
import iconPrev from "./icon-prev.svg";
import "./_pagination.scss";

interface PaginationProps {
  pagination: any;
  applyLookFor: (filters: any) => void;
  changePage: (increment: number) => void;
  currentFilters: any;
}

const Pagination: React.FC<PaginationProps> = ({
  pagination,
  applyLookFor,
  changePage,
  currentFilters,
}) => {
  return (
    <div className="pagination-buttons">
      {pagination.current.page > 1 && (
        <Button
          onClick={() => changePage(-1)}
          disabled={!pagination.current.hasPrevPage}
          customClass="btn-pagination"
        >
          <img src={iconPrev} alt="Prev" />
        </Button>
      )}

      {pagination.current.page > 2 && (
        <Button
          onClick={() => {
            changePage(1 - pagination.current.page);
          }}
          disabled={pagination.current.page === 1}
          customClass="btn-number-pagination"
        >
          1
        </Button>
      )}

      {pagination.current.page > 3 && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          ...
        </div>
      )}

      {[...Array(7)].map((_, i) => {
        const pageNumber = pagination.current.page - 3 + i;
        if (
          pageNumber < 1 ||
          pageNumber > (pagination.current.totalPages ?? 0) ||
          (pageNumber === 1 && pagination.current.page > 2)
        ) {
          return null;
        }
        return (
          <Button
            key={i}
            onClick={() => {
              changePage(pageNumber - pagination.current.page);
            }}
            disabled={pagination.current.page === pageNumber}
            customClass={`btn-number-pagination ${
              pagination.current.page === pageNumber ? "active-page" : ""
            }`}
          >
            {pageNumber as any}
          </Button>
        );
      })}

      {pagination.current.page < (pagination.current.totalPages ?? 0) - 3 && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          ...
        </div>
      )}

      {pagination.current.page < (pagination.current.totalPages ?? 0) - 1 && (
        <Button
          onClick={() => {
            changePage(pagination.current.totalPages - pagination.current.page);
          }}
          disabled={pagination.current.page === pagination.current.totalPages}
          customClass="btn-number-pagination"
        >
          {pagination.current.totalPages as any}
        </Button>
      )}

      {pagination.current.hasNextPage && (
        <Button
          onClick={() => changePage(1)}
          disabled={!pagination.current.hasNextPage}
          customClass="btn-pagination"
        >
          <img src={iconNext} alt="Next" />
        </Button>
      )}
    </div>
  );
};

export default Pagination;
