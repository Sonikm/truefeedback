import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" hover:text-cyan-400 absolute bottom-0 left-0 right-0 text-center py-4 text-gray-400 text-sm">
      &#169; {new Date().getFullYear()} True Feedback.{" "}
      <Link
        className=" text-white hover:hover:text-cyan-400 font-semibold"
        href="https://github.com/Sonikm"
      >
        Soni Kumari 🌸
      </Link>
    </footer>
  );
};

export default Footer;
