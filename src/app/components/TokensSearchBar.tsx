
import { ChangeEventHandler } from 'react'
import Networks from './Networks'
import { SearchSymbol } from '@/utils/Icons'

type TokensSearchBarProps = {
    handleFilter: ChangeEventHandler
}

const TokensSearchBar = ({ handleFilter }: TokensSearchBarProps) => {
    return (
        <div className="flex pb-4 bg-white dark:bg-gray-900">
            <div>
                <label htmlFor="table-search" className="sr-only">
                    Search
                </label>
                <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <SearchSymbol />
                    </div>
                    <input
                        onChange={handleFilter}
                        type="text"
                        id="table-search"
                        className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-50 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for tokens"
                    />
                </div>
            </div>
            <Networks />
        </div>
    )
}

export default TokensSearchBar

