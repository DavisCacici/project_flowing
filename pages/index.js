import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useState, useEffect} from 'react';
import axios from 'axios';
import { Col, Button, Row, Card, notification } from 'antd';
const { Meta } = Card;
import NavBar from '../components/NavBar';

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() =>{
      axios.get('/api/listarticles')
      .then(response =>{ 
        setArticles(response.data);
      })
      .catch(error => console.error(error));
  }, []);
  
  const AddToCart = async (article) => {
    try{
      const resp = await axios.post('/api/add_to_cart', {article});
      console.log(resp);
      if(resp.status === 200)
      {
        notification.open({
          message: 'Notifica Carrello',
          description: 'Aggiunto articolo ' + article.name + ' al carrello'
        });
      }
    }catch(error)
    {
      console.log(error);
    }
  }

  return (
    <div className={styles.container}>
      <NavBar />
        <Row className={styles.main}>
          {articles.length != 0 ? articles.map(article => {
              return (              
                  
                  <Col span={6} key={article._id} style={{ margin: '3%'}}  >
                    <Card>
                    
                    <Meta
                      title={article.name}
                      description={article.description}
                    />
                    <h3>${article.price}</h3>
                    <Button type="primary" onClick={() => AddToCart(article)}>Aggiungi al carrello</Button>
                    </Card>
                    
                  </Col>
              );
          }) : <h1>Non ci sono articoli momentaneamente</h1>}
        </Row>
    </div>
  )
}
