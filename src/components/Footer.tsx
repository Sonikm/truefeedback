const Footer = () => {
  return (
    <footer className=" hover:text-cyan-400 absolute bottom-0 left-0 right-0 text-center py-4 text-gray-400 text-sm">
      &#169; {new Date().getFullYear()} True Feedback. All rights reserved.
    </footer>
  );
};

export default Footer;
