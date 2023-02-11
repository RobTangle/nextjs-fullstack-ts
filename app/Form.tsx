import React from "react";
// require("dotenv").config();

export default function Form() {
  const [petObj, setPetObj] = React.useState({
    name: "",
    age: "",
    birthday: "",
  });

  async function createPet(petObject: any): Promise<{
    pet: { id: string; name: string; age?: number };
  }> {
    const res = await fetch(`http://localhost:3000/api/createPet`, {
      method: "POST",
      body: JSON.stringify(petObject),
    });
    if (!res.ok) {
      console.log(res);
    }
    return res.json();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("EVENT REACT FORM EVENT = ", e);

    // const data = await fetch(`${process.env.BASE_URL}/api/createPet`);
    console.log({ petObj });

    const data = await createPet(petObj);
    console.log("🚀 ~ file: Form.tsx:26 ~ handleSubmit ~ data", data);
  }
  return (
    <div className="bg-blue-100">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          onChange={(e) => setPetObj({ ...petObj, name: e.target.value })}
        />
        <label htmlFor="age">Age</label>
        <input
          type="number"
          onChange={(e) => setPetObj({ ...petObj, age: e.target.value })}
        />
        <label htmlFor="birthday">Birthday</label>
        <input
          type="date"
          onChange={(e) => setPetObj({ ...petObj, birthday: e.target.value })}
        />
        <button>Create pet</button>
      </form>
    </div>
  );
}
