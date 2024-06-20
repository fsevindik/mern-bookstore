import BookSingleCard from "./BookSingleCard";

const BooksCard = ({ books }) => {
  return (
    <div className="grid  lg:grid-cols-3 xl:grid-cols-4 space-x-2 space-y-2 cursor-pointer">
      {books.map((item) => (
        <BookSingleCard key={item._id} book={item} />
      ))}
    </div>
  );
};

export default BooksCard;
