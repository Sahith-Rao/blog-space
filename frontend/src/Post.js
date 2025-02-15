import {format} from 'date-fns';


export default function Post({title,summary,cover,content,createdAt}) {
return (

      <div className="post">
        
          <div className="image">
            <img src="https://techcrunch.com/wp-content/uploads/2023/01/IMG_2469-Large.jpeg" alt="" />
          </div>
          <div className="texts">
            <h2>{title}</h2>
            <p className= "info">
              <a className = "author">David Bosch</a>
              <time>{format(new Date(createdAt), 'MMM d, yyyy')}</time>
            </p>
            <p className = "summary">{summary}</p>
          </div>
          
      </div>
      
      
   
);
}