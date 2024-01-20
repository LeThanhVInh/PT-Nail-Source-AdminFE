import HashLoader from 'react-spinners/HashLoader';
import './Loader.scss';

export default function Loader(props) {
  const { colorLoader = '#fff', isLoading = true, hasBackground = true } = props;

  return (
    <div className={hasBackground ? 'sweet-loading' : 'sweet-loading no-bg'}>
      <HashLoader
        color={colorLoader}
        loading={isLoading}
        size={100}
        speedMultiplier={3}
        aria-label="Loading"
        data-testid="loader"
      />
    </div>
  );
}
