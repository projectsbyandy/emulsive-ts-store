import { constructUrl, constructUrlForPrevOrNext } from "@/utils";
import { useLoaderData, useLocation } from "react-router-dom";
import { PaginationItem, PaginationLink, Pagination, PaginationContent, PaginationPrevious, PaginationNext, PaginationEllipsis } from "./ui/pagination";
import { OrdersResponse } from "@/api/types";
import React from "react";

function PaginationContainerV2() {
  const {meta} = useLoaderData() as OrdersResponse;
  const {pageCount, page} = meta.pagination;

  const {search, pathname} = useLocation();
  
  if (pageCount < 2) return null;

  const constructButton = ({pageNumber, isActive}: {pageNumber: number, isActive: boolean}): React.ReactNode => {
    const url = constructUrl({pageNumber, search, pathname});
    return <PaginationItem key={pageNumber}>
      <PaginationLink to={url} isActive={isActive}>
        {pageNumber}
      </PaginationLink>
    </PaginationItem>
  }

  const constructEllipsis = (key: string): React.ReactNode => {
    return <PaginationItem key={key}>
      <PaginationEllipsis />
    </PaginationItem>
  }

  const renderPagination = () => {
    let pages:React.ReactNode[] = [];
    // first page
    pages.push(constructButton({pageNumber: 1, isActive: page === 1}));

    // Ellipsis
    if (page > 2) {
      pages.push(constructEllipsis('dots-1'))
    }

    // active page
    if (page !== 1 && page !== pageCount)
      pages.push(constructButton({pageNumber: page, isActive: true}));
    
    // Ellipsis
    if (page < pageCount -1) {
      pages.push(constructEllipsis('dots-1'))
    }

    // last page
    pages.push(constructButton({pageNumber: pageCount, isActive: page === pageCount}));
    
    return pages;
  }
  
  const {prevUrl, nextUrl } = constructUrlForPrevOrNext({
    currentPage: page, pageCount, search, pathname
  });

  return (
    <Pagination className='mt-16'>
      <PaginationContent>
          <PaginationItem>
            <PaginationPrevious to={prevUrl}/>
          </PaginationItem>
          {renderPagination()}
          <PaginationItem>
            <PaginationNext to={nextUrl}/>
          </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
export default PaginationContainerV2