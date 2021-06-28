import {Container, Row, Col, Card, Button} from 'react-bootstrap';

export default function ProductSummary(props) {

    const product = props.product;

    return (
        <>
        <Card style={{ flex: '1 0 21%' }}>
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>

            </Card.Body>
        </Card>
        </>
    );
}