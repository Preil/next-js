import path from "path";
// file system module
import fs from "fs/promises";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

// this function provides data for the page to prerender,
export async function getStaticProps() {
  console.log("Regenerating...");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  //redirect example incase data can't be fetched for some reasons
  if (!data) {
    return {
      redirect: {
        destination: "/no-date",
      },
    };
  }

  // rendering 404 example
  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    // revalidate parameter means that page will be regerated at server side every 10 seconds
    revalidate: 10,
  };
}

export default HomePage;
