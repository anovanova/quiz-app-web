"use client";

import { useSearchParams } from "next/navigation";

function GradePage() {
  const searchParams = useSearchParams();

  const data = searchParams.get("data");
  const parsedData = JSON.parse(data!);

  return (
    <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="w-full text-center pb-4">
          <h1 className="text-2xl font-bold">Grade</h1>
        </div>
        <div className="w-full text-center">
          <p className="text-xl font-bold">{`${parsedData.response.score}/${parsedData.response.total}`}</p>
        </div>
        <div className="w-full text-center py-8">
          <h1 className="text-2xl font-bold">Results</h1>
        </div>
        <div className="w-full">
          {parsedData.response.results.map(
            (item: { id: string; correct: boolean }, index: number) => {
              return (
                <div className="grid grid-cols-2" key={index}>
                  <div className="text-center font-bold">{item.id}</div>
                  <div className="text-center">
                    {item.correct ? (
                      <p className="text-green-600 font-bold">Correct</p>
                    ) : (
                      <p className="text-red-600 font-bold">Incorrect</p>
                    )}
                  </div>
                </div>
              );
            },
          )}
        </div>
      </main>
    </div>
  );
}

export default GradePage;
