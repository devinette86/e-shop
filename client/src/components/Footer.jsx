const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>E-shop &copy; {currentYear}</p>
    </footer>
  );
};
export default Footer;
