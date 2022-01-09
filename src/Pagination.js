export function generatePaginationButtons(data, search=null) {
    let pagesButtons = []
    const currentPage = parseInt(data.current_page)

    let searchParam = ''
    if (search != null) {
        searchParam = '&search=' + search
    }

    if (currentPage > 1) {
        pagesButtons.push(<a href={'?page=' + (currentPage-1) + searchParam} key={-1} className='m-1 btn btn-primary'>Previous</a>)
    }

    for (let i = 0; i < parseInt(data.pages_count); i++) {
        const isCurrentPage = (i+1) === parseInt(data.current_page)
        pagesButtons.push(<a href={'?page=' + (i+1) + searchParam} key={i} className={'m-1 btn btn-primary' + (isCurrentPage ? ' disabled' : '')}>{i+1}</a>)
    }

    if (currentPage < parseInt(data.pages_count)) {
        pagesButtons.push(<a href={'?page=' + (currentPage+1) + searchParam} key={parseInt(data.pages_count)+1} className='m-1 btn btn-primary'>Next</a>)
    }

    return pagesButtons
}
