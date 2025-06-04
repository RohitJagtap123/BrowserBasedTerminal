import React from "react";
import EnvCard from "../components/EnvCards";
const languages = [
  {
    name: "Python",
    description:
      "An easy-to-read language widely used for web, data science, automation, and scripting.",
  },
  {
    name: "Java",
    description:
      "A robust, platform-independent language widely used in enterprise and Android development.",
  },
  {
    name: "CPP",
    description:
      "A high-performance language commonly used for system programming and game development.",
  },
  {
    name: "Node",
    description:
      "The core language of the web, used for interactive websites and modern web apps.",
  },
  {
    name: "Go",
    description:
      "A statically typed language by Google, known for simplicity and great concurrency support.",
  },
  {
    name: "Rust",
    description:
      "A systems programming language focused on safety, speed, and concurrency without garbage collection.",
  },
  {
    name: "Ruby",
    description:
      "A flexible language known for developer happiness and powering the Ruby on Rails framework.",
  },
  {
    name: "PHP",
    description:
      "A widely-used, open-source scripting language primarily used for server-side web development",
  },
  {
    name: "Bash",
    description:
      "A command-line scripting language used in Linux environments for automation and system tasks.",
  },
];

const Landing = () => {
  return (
    <div className="w-full px-10 min-h-screen bg-[#111111] bg-cover bg-no-repeat bg-center overflow-hidden">
      <h1 className="text-3xl font-bold text-white my-10 ">Shellify</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {languages.map((lang, index) => (
          <EnvCard
            key={index}
            name={lang.name}
            description={lang.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Landing;
