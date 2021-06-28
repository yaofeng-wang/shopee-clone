import {Container, Row, Col, CardDeck} from 'react-bootstrap';
import ProductSummary from './ProductSummary';

const getProductSummaries = (products) => {
    console.log(products)
    const originalLength = products.length;
    const newLength = originalLength - originalLength % 4
    return products.slice(0, newLength);
}


export default function ProductSummaryList(props) {
    
    const products = getProductSummaries(props.products) 

    return (
        <Container>
            <Row >
                <Col>
                    <h1 className="text-center">ProductSummaryList</h1>
                    <CardDeck style={{ flexWrap: 'wrap' }}>
                        {products.map((product, index) => <ProductSummary key={index} product={product}/>)}
                    </CardDeck>
                </Col>
            </Row>
        </Container>
    );
}

