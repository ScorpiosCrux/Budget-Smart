import CategoriesWidget from "@/components/widgets/CategoriesWidget/CategoriesWidget";
import TransactionsWidget from "@/components/widgets/TransactionsWidget/TransactionsWidget";
import Head from "next/head";
import styled from "styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useData } from "@/hooks/useData";

export default function Sort() {
  const {
    isLoading,
    categories,
    setCategories,
    setIsCategoriesLoading,
    transactions,
    setTransactions,
    setIsTransactionsLoading,
    deleteTransaction,
    deleteCategory,
    addCategory,
  } = useData();

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
          {isLoading === false && (
            <>
              <CategoriesWidget
                categories={categories}
                addCategory={addCategory}
                deleteCategory={deleteCategory}
              />
              <TransactionsWidget
                transactions={transactions}
                setTransactions={setTransactions}
								setIsTransactionsLoading={setIsTransactionsLoading}
                deleteTransaction={deleteTransaction}
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
