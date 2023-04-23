import CategoriesWidget from "components/CategoriesWidget/CategoriesWidget";
import TransactionsWidget from "components/TransactionsWidget/TransactionsWidget";
import Head from "next/head";
import styled from "styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useData } from "hooks/useData";

export default function Sort() {
  const data = useData();

  return (
    <>
      <Head>
        <title>Sort Transactions | Smart Budget</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SortWrapper>
        <DndProvider backend={HTML5Backend}>
          {data.isLoading === false && data.categories && data.transactions && (
            <>
              <CategoriesWidget
                categories={data.categories}
                addCategory={data.addCategory}
                deleteCategory={data.deleteCategory}
              />
              <TransactionsWidget
                transactions={data.transactions}
                sortTransactionHelper={data.sort}
                uploadTransactionCSVHelper={data.uploadCSV}
                deleteTransaction={data.deleteTransaction}
              />
            </>
          )}
        </DndProvider>
      </SortWrapper>
    </>
  );
}

const SortWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;
