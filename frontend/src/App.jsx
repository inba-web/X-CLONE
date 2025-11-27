import React from "react";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">DaisyUI Test 🚀</h1>

      <button className="btn btn-primary mb-4">
        Primary Button
      </button>

      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img src="https://placekitten.com/400/200" alt="Kitten" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Cute Kitten</h2>
          <p>This is a DaisyUI card component. Check if it works!</p>
          <div className="card-actions justify-end">
            <button className="btn btn-secondary">Action</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
