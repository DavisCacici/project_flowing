import styles from '../styles/Home.module.css';
import { useState, useEffect} from 'react';
import axios from 'axios';
import { Col, Button, Row, Card, Divider } from 'antd';
import NavBar from '../components/NavBar';
const { Meta } = Card;

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [flag, setFlag] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() =>{
      axios.get('/api/listcart')
      .then(response =>{ 
        setArticles(response.data);   
        let subtotal = 0;  
        response.data.forEach(element => {
          subtotal = subtotal + (element.article.price * element.quantity);          
        });
        setTotal(subtotal);
      })
      .catch(error => console.error(error));
    
    
  }, [flag]);


  const PlusOrMinus = async (itemsID, plus) => {
    if(plus === 'plus')
    {
      try{
        let response = await axios.put('/api/plus', {itemsID: itemsID});
        if(response.status == 200)
        {
          flag ? setFlag(false) : setFlag(true);
        }

      }catch(error)
      {
        console.log(error);
      }
      
    }
    else if(plus === 'minus'){
      try{
        let response = await axios.put('/api/minus', {itemsID: itemsID});
        if(response.status == 200)
        {
          flag ? setFlag(false) : setFlag(true);
        }
        

      }catch(error)
      {
        console.log(error);
      }
    }
  }
  

  return (
    <div className={styles.container}>
      <NavBar />
        <Row className={styles.main} gutter={16}>
          {articles.length != 0 ? articles.map(items => {
              return (
                
                <Col span={6} style={{ }} key={items.itemsID} >
                    
                    <Card>
                        <Meta
                          title={items.article.name}
                          description={items.article.description}
                        />
                        <h3>${items.article.price}</h3>
                        <Row>                        
                          <Button type='dashed' onClick={() => PlusOrMinus(items.itemsID, 'minus')} >-</Button>
                         
                          <p style={{ margin: '5px' }}> {items.quantity} </p>

                          <Button type='dashed' onClick={() => PlusOrMinus(items.itemsID, 'plus')} >+</Button>                          
                        </Row>
                        
                        
                    </Card>
                
                </Col>
              );
          }) : <h1>Non ci sono articoli momentaneamente</h1>}
        </Row>
        <Divider orientation="left"></Divider>
        <Row>
          <Col span={8}>
            <h3>Totale: ${total}</h3>
          </Col>
        </Row>
        <Divider orientation="left"></Divider>
        <Button type="primary" block>
          Pagamento
        </Button>
    </div>
  )
}
