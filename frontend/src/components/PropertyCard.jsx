import './PropertyCard.css';

function PropertyCard({ property, isFav, busy, onToggle }) {
  return (
    <article className="property-card">
      <div className="property-card-img-wrap">
        <img src={property.image} alt="" />
        <button
          type="button"
          className={`property-card-heart ${isFav ? 'property-card-heart--on' : ''}`}
          onClick={() => onToggle(property)}
          disabled={busy}
          aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
        >
          {isFav ? '♥' : '♡'}
        </button>
      </div>
      <div className="property-card-body">
        <h3>{property.title}</h3>
        <p className="property-card-loc">{property.location}</p>
        <p className="property-card-price">${property.price.toLocaleString()}</p>
      </div>
    </article>
  );
}

export default PropertyCard;
