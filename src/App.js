import { useEffect, useState } from 'react';

let imageArray = [
  1,2,3,4,5,6
]

function Container() {
  const renderChildrenView = (item ,index) =>{
    return (
      <div className='contentBox' key={index}>
        <div className='cardBox'>
          <div 
            
            className="imageStyle"/> 
          <div className='fontBox'>
            <p className='titleStyle'>{item}</p>
          
          </div>

        </div>
        
     </div>
    )
  }
  return (
    <div id="app">
               <Carousel 
          dataArray = {imageArray }
          autoplay={true}
          delay={1}
          carouselPostWidth={'800px'} 
          carouselPostHeight={150}
          carouselPostMargin={10}>
          {renderChildrenView}
          </Carousel>
    </div>
  );
}

export default Container;

const Carousel = (props) => {
  const {dataArray,carouselPostMargin,carouselPostWidth,carouselPostHeight} = props
  const [nowIndex, setNowIndex] = useState(0)
  useEffect(() => {
    if(props.autoplay){
      const timer = setInterval(()=> {
        changeImagePosition(1)
   },props.delay *1000);
   return () => clearInterval(timer)
    }
  }, [nowIndex])
  
  const conputedLeft = () =>{
    console.log('nowIndex',nowIndex)
    let leftSpan = parseInt(`${-nowIndex * parseInt(carouselPostWidth)}`)
    return{
      left: carouselPostWidth.toString().match(/[%vw]/) != null ? 
      `calc(${leftSpan}% - ${carouselPostMargin*2*nowIndex}px)`: 
      `${leftSpan - (carouselPostMargin*2*nowIndex)}px`
    }
  }
  console.log(nowIndex)
  const changeImagePosition = (index) =>{
     // (1 + 1 + 3) % 3
     setNowIndex(
        (nowIndex + index +  dataArray.length) % dataArray.length
     )
  }
  
 

    return(
      <div className='carouselContainer'>
        <div className="carouselArea">
          <div style={conputedLeft()} className="carouselPosts">
            {dataArray.map((imgaeUrl,index)=>{
              return(
               <div 
                 key={imgaeUrl} 
                  style={{
                    width:carouselPostWidth, 
                    height:carouselPostHeight,  
                    margin:`0px ${carouselPostMargin}px `,...props.carouselPostStyle}} 
                  className="carouselPostBox">
                  {props.children(imgaeUrl,index)}
               </div>
              )
            })}
        </div>
      </div>
      
        <div onClick={()=>changeImagePosition(-1)} className="controlLeft">Prev</div>
        <div onClick={()=>changeImagePosition(1)} className="controlRight">Next</div>
      </div>
    )
  
}