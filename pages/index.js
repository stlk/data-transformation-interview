import dynamic from "next/dynamic";

const DynamicTree = dynamic(import("../components/tree"), {
  ssr: false
});

export default () => (
  <div className="p-8">
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <header>
        <h1>Tree transformations</h1>
      </header>
      <DynamicTree />
    </div>
    <p className="text-center text-grey text-xs">
      Created with ☕ by Josef Rousek
    </p>
  </div>
);
