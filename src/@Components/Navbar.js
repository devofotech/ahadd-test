import MainContentNavbar from '@Components/MainContentNavbar';

export default function Navbar({ link, text, subtext }) {
  return (
    <div className="d-flex mt-1">
      <MainContentNavbar to={link} text={text} />
      {subtext && <h1 className="text-light mt-1" style={{ paddingLeft: 10 }}>&gt; {subtext}</h1>}
    </div>
  );
}
