import Skeleton from "src/components/ui/Skeleton";

export default function TodoListSkeleton() {
  const arr = Array(20).fill(1);
  return (
    <>
      {arr.map((_, index) => {
        return (
          <Skeleton
            key={index}
            style={{
              flexGrow: "1",
              height: "60px",
              borderRadius: "0.5em",
            }}
          />
        );
      })}
    </>
  );
}
