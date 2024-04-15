 import { Card } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { PieChart } from 'react-minimal-pie-chart';
import { useAssets } from '../AssetsContext';
import { Asset, AssetMap, CoinMap, Summary } from '@/utils/interfaces';
import distinctColors from 'distinct-colors';

type ChartData = {
    title: string
    value: number
    color: string
}

const Charts = () => {

    const defaultLabelStyle = {
        fontSize: "7px",
        fontFamily: "sans-serif",
        fill: "#ffffff",
    };

    const {filteredSummary, filteredAssets, coins} = useAssets()
    const [walletsData, setWalletsData] = useState<ChartData[]>([]);
    const [networksData, setNetworksData] = useState<ChartData[]>([]);
    const [coinsData, setCoinsData] = useState<ChartData[]>([]);


    useEffect(() => {
        setNetworksData(getNetworksData(filteredSummary));
    }, [filteredSummary]);

    useEffect(() => {
        setWalletsData(getWalletsData(filteredAssets, filteredSummary))
        setCoinsData(getCoinsData(coins, filteredSummary))
    }, [filteredAssets, filteredSummary])

    return (
      <>
      {filteredSummary.all > 0 &&
                <Card className="">
                    <div className="flex flex-wrap justify-center gap-6 ">

                        <div>
                            <div className="flex justify-center space-x-4">
                                <div className="w-44">

                                    {networksData.length > 0 && (
                                        <PieChart
                                            viewBoxSize={[100, 100]}
                                            center={[50, 50]}
                                            radius={50}
                                            data={networksData}
                                            labelPosition={50}
                                            label={({ dataEntry }) =>
                                                dataEntry.value > 1
                                                    ? `${dataEntry.value.toFixed(0)}% `
                                                    : null
                                            }
                                            labelStyle={{ ...defaultLabelStyle }}
                                            animate={true}
                                            reveal={100}
                                            animationDuration={1000}
                                        />
                                    )}
                                </div>

                                <div>
                                    {filteredSummary.all > 0 && (
                                        <ChartLabel data={networksData} kind={"networks"} />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-center space-x-4">
                                <div>
                                    {walletsData.length > 0 && (
                                        <div className="w-44">
                                            <PieChart
                                                viewBoxSize={[100, 100]}
                                                center={[50, 50]}
                                                radius={50}
                                                data={walletsData}
                                                labelPosition={50}
                                                label={({ dataEntry }) =>
                                                    dataEntry.value > 1
                                                        ? `${dataEntry.value.toFixed(0)}%`
                                                        : null
                                                }
                                                labelStyle={{ ...defaultLabelStyle }}
                                                animate={true}
                                                reveal={100}
                                                animationDuration={1000}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>

                                    {filteredSummary.all > 0 && (
                                        <ChartLabel data={walletsData} kind={"wallets"} />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-center space-x-4">
                                <div>
                                    {coinsData.length > 0 && (
                                        <div className="w-44">
                                            <PieChart
                                                viewBoxSize={[100, 100]}
                                                center={[50, 50]}
                                                radius={50}
                                                data={coinsData}
                                                labelPosition={50}
                                                label={({ dataEntry }) =>
                                                    dataEntry.value > 1
                                                        ? `${dataEntry.value.toFixed(0)}%`
                                                        : null
                                                }
                                                labelStyle={{ ...defaultLabelStyle }}
                                                animate={true}
                                                reveal={100}
                                                animationDuration={1000}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    {coinsData.length > 0 &&  (
                                        <ChartLabel data={coinsData} kind={"coins"} />
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </Card>
      }
      </>

        
  )
    
     function ChartLabel({ data, kind }: {data: ChartData[], kind: String}) {
        return (
            <div>
                {data.map((label, i) => [
                    <div key={i}>
                        <div className="flex items-center">
                            <span
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: label.color }}
                            ></span>

                            {kind === "networks" && (
                                <p className="text-sm pl-2 capitalize text-gray-900 dark:text-white">
                                    {label.title && label.title}
                                </p>
                            )}

                            {kind === "wallets" && (
                                <p className="text-sm pl-2 text-gray-900 dark:text-white">
                                    {label.title && label.title.slice(36)}
                                </p>
                            )}

                            {kind === "coins" && (
                                <p className="text-sm pl-2 text-gray-900 dark:text-white">
                                    {label.title && label.title}
                                </p>
                            )}
                        </div>
                    </div>
                ])}
            </div>
        );
    } 

}

export default Charts 

function getNetworksData(summary: Summary) {
    let tempArray = [
        {
            title: "ethereum",
            value:
                summary.all !== 0
                    ? (summary.chainsValueUSD["ethereum"] / summary.all) * 100
                    : 0,
            color: "#3366C8",
        },
        {
            title: "arbitrum",
            value:
                summary.all !== 0
                    ? (summary.chainsValueUSD["arbitrum"] / summary.all) * 100
                    : 0,
            color: "#DB3B1F",
        },
        {
            title: "polygon",
            value:
                summary.all !== 0
                    ? (summary.chainsValueUSD["polygon"] / summary.all) * 100
                    : 0,
            color: "#18952A",
        },
        {
            title: "optimism",
            value:
                summary.all !== 0
                    ? (summary.chainsValueUSD["optimism"] / summary.all) * 100
                    : 0,
            color: "#980696",
        },
    ];

    const filteredArray = tempArray.filter((item) => item.value > 0);

    return filteredArray;
}

function getWalletsData(assets: AssetMap, summary: Summary) {
    const tempArray = [];
    const totalValueUSD = summary.all; // Total value of all assets

    // Generate distinct colors for wallets
    const walletsPalette = distinctColors({
        count: Object.keys(assets).length,
        lightMin: 55,
        lightMax: 80,
        chromaMin: 30,
        chromaMax: 80,
        hueMin: 0,
        hueMax: 300,
    });

    // Iterate through assets to calculate data for each wallet
    let i = 0;
    for (const walletAddress in assets) {
        if (Object.prototype.hasOwnProperty.call(assets, walletAddress)) {
            const asset = assets[walletAddress];
            const walletTotalValue = calculateWalletTotalValue(asset); // Calculate total value for the wallet

            // Calculate percentage of total value for the wallet
            const walletPercentage = totalValueUSD !== 0 ? (walletTotalValue / totalValueUSD) * 100 : 0;

            // Push data for the wallet to the tempArray
            tempArray.push({
                title: walletAddress,
                value: walletPercentage,
                color: walletsPalette[i].hex()
            });
            i++;
        }
    }

    // Sort the array based on wallet percentage in descending order
    const sortedArray = tempArray.sort((a, b) => b.value - a.value);

    // Return the sorted array
    return sortedArray;
}

// Helper function to calculate total value for a wallet
function calculateWalletTotalValue(asset: Asset) {
    let totalValue = 0;
    for (const token of asset.tokens) {
        totalValue += token.usdValue;
    }
    for (const nativeToken of asset.native) {
        totalValue += nativeToken.usdValue;
    }
    return totalValue;
}

function getCoinsData(coins: CoinMap, summary: Summary) {
   
    let tempArray: ChartData[] = [];

    let coinsPalette = distinctColors({
        count: Object.keys(coins).length,
        lightMin: 55,
        lightMax: 80,
        chromaMin: 30,
        chromaMax: 80,
        hueMin: 0,
        hueMax: 300,
    });

    Object.values(coins).forEach((obj, i) => {
        let insert = {
            title: obj.symbol,
            value:
                summary.tokensValueUSD !== 0
                    ? (obj.usdValue / summary.tokensValueUSD) * 100
                    : 0,
            color: coinsPalette[i].hex(),
        };
        tempArray.push(insert);
    });
    if (tempArray.length < 10) {
        return tempArray;
    } else {
        return tempArray.sort((a, b) => b.value - a.value).slice(0, 5);
    }
}