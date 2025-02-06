import { useRouter } from "next/router";
import { useGetSingleQuestionQuery } from "@/services/api";

const QuestionDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: question, error, isLoading } = useGetSingleQuestionQuery(id);

  if (isLoading) return <p>Loading question details...</p>;
  if (error) return <p>Error loading question details</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{question?.data?.question}</h1> 
      <p className="mt-2">{question?.data?.description}</p>
    </div>
  );
};

export default QuestionDetail;
