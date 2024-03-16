'use client'

import { Table } from 'flowbite-react';
import React, { useEffect, useState, ChangeEvent } from 'react'
import { useAssets } from '../AssetsContext';
import { AssetMap, Token, TokenMap } from '@/utils/interfaces';
import millify from 'millify';
import TokensSearchBar from './TokensSearchBar';
import TokensPagination from './TokensPagination';
import { CopyIcon, SortingSymbol } from '@/utils/Icons';


const TokensTable = () => {
    const { filteredAssets } = useAssets() // Filtered tokens, not merged
    const [tokens, setTokens] = useState<TokenMap>({})

    // Variables needed for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const npage = Math.ceil(Object.values(tokens).length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    const records = Object.values(tokens).slice(firstIndex, lastIndex); // tokens sliced into 10 for pagination

    const [visibleTokens, setVisibleTokens] = useState<TokenMap>({}); // variable needed for search bar


    // Sorting logic
    const [order, setOrder] = useState("ASC");
    const sorting = <T extends keyof Token>(col: T) => {
        const sortedTokens = Object.values(tokens).sort((a, b) => {
            if (order === "ASC") {
                return a[col]! > b[col]! ? 1 : -1
            } else {
                return a[col]! < b[col]! ? 1 : -1;
            }
        })

        const tokenMap: TokenMap = {};
        sortedTokens.forEach(token => {
            tokenMap[token.contractAddress] = token;
        });

        setTokens(tokenMap);
        setOrder(prevOrder => (prevOrder === "ASC" ? "DSC" : "ASC"));
    };

    useEffect(() => {
        setTokens(mergeTokensFromAssets(filteredAssets))
        setVisibleTokens(tokens)
    }, [filteredAssets])


    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <TokensSearchBar handleFilter={handleFilter} />

            {Object.keys(tokens).length > 0 &&
                <>
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Symbol</Table.HeadCell>

                            <Table.HeadCell className="">
                                <div
                                    className="flex justify-end items-center cursor-pointer"
                                    onClick={() => sorting("price")}
                                >
                                    Price
                                    <SortingSymbol />
                                </div>
                            </Table.HeadCell>
                            <Table.HeadCell>
                                <div
                                    className="flex justify-end items-center cursor-pointer"
                                    onClick={() => sorting("balance")}
                                >
                                    Balance
                                    <SortingSymbol />
                                </div>
                            </Table.HeadCell>
                            <Table.HeadCell>
                                <div
                                    className="flex justify-end items-center cursor-pointer"
                                    onClick={() => sorting("usdValue")}
                                >
                                    Value
                                    <SortingSymbol />
                                </div>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">

                            {records.map((token, index) => {

                                return (
                                    <Table.Row
                                        key={index}
                                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            <div className="flex items-center space-x-2">
                                                <img src={token.logo} alt="" className="w-7 rounded-full" />
                                                <div>
                                                    <div className="flex items-center">
                                                        <div className="text-sm font-medium text-gray-900 truncate dark:text-white uppercase">
                                                            {token.name}
                                                        </div>
                                                        <div
                                                            onClick={() => { navigator.clipboard.writeText(token.contractAddress) }}
                                                            className="cursor-pointer"
                                                        >
                                                  <CopyIcon />
                                                        </div>
                                                    </div>
                                                    <div className="text-sm text-gray-500 truncate dark:text-gray-400 capitalize">
                                                        {token.chain}
                                                    </div>
                                                </div>
                                            </div>
                                        </Table.Cell>

                                        <Table.Cell className="text-right">
                                            ${millify(token.price)}


                                        </Table.Cell>
                                        <Table.Cell className="text-right">
                                            {millify(token.balance)}

                                        </Table.Cell>
                                        <Table.Cell className="text-right">
                                            ${millify(token.usdValue)}

                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </Table>

                    <TokensPagination
                        firstIndex={firstIndex}
                        lastIndex={lastIndex}
                        filteredTokens={tokens}
                        prevPage={prevPage}
                        numbers={numbers}
                        changeCurrentPage={changeCurrentPage}
                        nextPage={nextPage}
                    />
                </>
            }


        </div>
    );





    function prevPage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function nextPage() {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1);
        }
    }

    function changeCurrentPage(id: number) {
        setCurrentPage(id);
    }

    // Filtering tokens by name

    function handleFilter(event: ChangeEvent<HTMLInputElement>) {
        const newData = Object.values(visibleTokens)?.filter((row) =>
            row.name.toLowerCase().includes(event.target.value.toLowerCase())
        );
        if (newData) {
            const tokenMap: TokenMap = {};
            newData.forEach(token => {
                tokenMap[token.contractAddress] = token;
            });

            setTokens(tokenMap);

        }
    };
}

export default TokensTable





function mergeTokensFromAssets(assets: AssetMap): TokenMap {
    const mergedTokens: TokenMap = {};

    Object.values(assets).forEach((asset) => {
        asset.tokens.forEach((token) => {
            const { contractAddress } = token;
            if (!mergedTokens[contractAddress]) {
                mergedTokens[contractAddress] = { ...token };
            } else {
                mergedTokens[contractAddress].balance += token.balance;
                mergedTokens[contractAddress].usdValue += token.usdValue;
            }
        });
    });

    return mergedTokens;
}


