import { NextPageIcon, PreviousPageIcon } from '@/utils/Icons'
import { TokenMap } from '@/utils/interfaces'


type TokensPaginationProps = {
    firstIndex: number
    lastIndex: number
    filteredTokens: TokenMap
    numbers: number[]
    prevPage: () => void
    nextPage: () => void
    changeCurrentPage: (id: number) => void
}

const TokensPagination = ({
    firstIndex,
    lastIndex,
    filteredTokens,
    prevPage,
    nextPage,
    numbers,
    changeCurrentPage

}: TokensPaginationProps) => {
    return (
        <nav
            className="flex items-center justify-between py-3 px-2"
            aria-label="Table navigation"
        >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                    {firstIndex}-
                    {lastIndex > Object.values(filteredTokens).length
                        ? Object.values(filteredTokens).length
                        : lastIndex}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                    {Object.values(filteredTokens).length}
                </span>
            </span>
            <ul className="inline-flex items-center -space-x-px">
                <li>
                    <div
                        onClick={prevPage}
                        className="cursor-pointer block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <span className="sr-only">Previous</span>
                        <PreviousPageIcon />
                    </div>
                </li>
                {numbers.map((number, i) => (
                    <li key={i}>
                        <div
                            onClick={() => changeCurrentPage(number)}
                            className="cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            {number}
                        </div>
                    </li>
                ))}

                <li>
                    <div
                        onClick={nextPage}
                        className="cursor-pointer block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <span className="sr-only">Next</span>
                        <NextPageIcon />
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default TokensPagination