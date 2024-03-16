import { Card } from "flowbite-react";

const NoWallets = () => {
  return (
      <Card>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              No wallets added.{" "}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
              Please add some new addresses.
          </p>
      </Card>
  )
}

export default NoWallets