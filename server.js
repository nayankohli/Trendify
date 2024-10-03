const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const mongodb = require("mongodb");
const client=mongodb.MongoClient;
const session = require("express-session");
let dbinstance
const upload = multer({ dest: path.join(__dirname, 'public') });
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Serve Font Awesome files from node_modules
app.use('/css', express.static(path.join(__dirname, '../node_modules/@fortawesome/fontawesome-free/css')));
app.use('/webfonts', express.static(path.join(__dirname, '../node_modules/@fortawesome/fontawesome-free/webfonts')));

client.connect("mongodb+srv://nayan:jaihind1480@cluster0.2skqcsw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(database=>{
  dbinstance=database.db("website");
    console.log("connected");
}).catch(e=>{
    console.log(e);
})
app.use(session({
  saveUninitialized:true,
  resave:false,
  secret:"abc"
}))
// let user={
//   username:"Nayan",
//   pass:"123",
//   email:"nayankohli7@gmail.com",
//   address:"abc",
//   role:"admin"
// }
// let products=[
// {name:"Macbook 13 pro",price:"100000",pic:"4e7bdfb45e7697ecbf50d1e4b7af7768",category:"electronics",desc:"bohot mehanga"},
// {name:"Armani Exchange",price:"11196",pic:"a643dda6a2c587675abd621578c1e4fb",category:"women",desc:"Quartz\r\nCase diameter: 36 MM\r\nWatch Strap: 18 MM\r\nWater Resistant: 3 ATM\r\nFeature: 3 Hand\r\nOccasion: Casual\r\n2 Years Warranty"},
// {name:"fridge",price:"20000",pic:"98da8bf2f49f3b1b7501c4d38db0ef73",category:"electronics",desc:"erxtrytyuinuomipo,[p.["},
// {name:"Embroidered Cami Top",price:"690",pic:"4f094af0c46cbe8597a431abf00d8d4c",category:"women",desc:"Material: Polyester, Elastane\r\nLining: Polyester\r\nStretchability: Very Stretchable\r\nFit: Slim Fit\r\nQuantity: 1 Piece\r\nChest Pad: No\r\nNeckline: Sweetheart Neckline\r\nLength: Cropped\r\nSilhouette: S-line"},
// {name:"Blue Sneakers",price:"3999",pic:"28b6d15d5b97158414aca5068766c26e",category:"women",desc:"U.S.Polo Women Colour Block Nova Sneakers"},
// {name:"Green -shirt",price:"699",pic:"11b098ea9f3196af4c58267c4112cce4",category:"kids",desc:"Tom And Jerry: Thinking Tom tshirt for kids"},
// {name:"Beige Top",price:"499",pic:"f734adba8993eee0968c90b6a1652cd1",category:"women",desc:"Beige Front Twist Ribbed Top"},
// {name:"White Stripe Sneakers",price:"2039",pic:"5b07ef158f4bd29b76dcdd57d89c64d3",category:"men",desc:"U.S.POLO ASSN Men off white Contrast Stripe Canvas Clarkin Sneakers"},
// {name:"Blue Cargo Jeans",price:"1899",pic:"39691fae7f24cbda4f20e2310c3836b7",category:"men",desc:"Freakins's Men’s Blue Patch & Seam Cargo Jeans"},
// {name:"Denim Shorts",price:"531.44",pic:"9de1c4696482126555d965f4d708ded8",category:"kids",desc:"Kookie Kids Mid Thigh Length Denim Shorts with Strawberry Embroidery - Blue"},]

// setTimeout(()=>{
//   dbinstance.collection("users").insertOne(user).then(()=>{
//     console.log("admin added");
//   }).catch(e=>{
//     console.log(e);
//   })
//   dbinstance.collection("products").insertMany(products).then(()=>{
//     console.log("products added");
//   }).catch(e=>{
//     console.log(e);
//   })
// },10000);
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.get("/",(req,res)=>{
  res.render("home");
})
app.get("/login",(req,res)=>{
  res.render("login");
})
app.post("/login",(req,res)=>{
  let {username,pass}=req.body;
  dbinstance.collection("users").findOne({username:username,pass:pass}).then((data)=>{
      if(data){
          req.session.logedIn=true;
          req.session.detail=data;
          res.redirect("/");
      }
      else{
          res.redirect("/signup");
      }
  }).catch(e=>{
      console.log(e);
  })
})
app.get("/signup",(req,res)=>{
  res.render("signup",{message:" "});
})
app.post("/signup",(req,res)=>{
  let {username,pass,email,address}=req.body;
  dbinstance.collection("users").findOne({username:username,pass:pass}).then((data)=>{
      if(data){
          res.render("signup",{message:"user already exists"});
      }
      else{
          data=JSON.parse(data);
          let obj={
            username:username,
            pass:pass,
            email:email,
            address:address,
            role:"user"
          }
          dbinstance.collection("users").insertOne(obj).then(data=>{
              res.redirect("/login");
          }).catch(e=>{
              console.log(e);
          })
      }
  }).catch(e=>{
      console.log(e);
  })
});
app.get("/add",(req,res)=>{
  res.render("add");
})
app.post("/add", upload.array("pic", 5), (req, res) => { // change "pics" to the name of the input field in your form
  let { name, price, category, desc } = req.body;
  let pics = req.files ? req.files.map(file => file.filename) : [];

  let obj = {
    name: name,
    price: price,
    pic: pics,
    category: category,
    desc: desc
  };

  dbinstance.collection("products").insertOne(obj).then(d => {
    res.redirect("/");
  }).catch(err => {
    res.status(500).send(err);
  });
});
app.get("/heart",(req,res)=>{
  res.render("heart");
})
app.get("/cart",(req,res)=>{
  res.render("cart");
})
app.get("/men",(req,res)=>{
  dbinstance.collection("products").find({category:"men"}).toArray().then(data=>{
    res.render("category",{data});
  }).catch(e=>{
    console.log(e);
  })
})
app.get("/new",(req,res)=>{
  dbinstance.collection("products").find({}).toArray().then(data=>{
    res.render("category",{data});
  }).catch(e=>{
    console.log(e);
  })
})
app.get("/women",(req,res)=>{
  dbinstance.collection("products").find({category:"women"}).toArray().then(data=>{
    res.render("category",{data});
  }).catch(e=>{
    console.log(e);
  })
})
app.get("/kids",(req,res)=>{
  dbinstance.collection("products").find({category:"kids"}).toArray().then(data=>{
    res.render("category",{data});
  }).catch(e=>{
    console.log(e);
  })
})
app.get("/electronics",(req,res)=>{
  dbinstance.collection("products").find({category:"electronics"}).toArray().then(data=>{
    res.render("category",{data});
  }).catch(e=>{
    console.log(e);
  })
})
app.get("/logout",(req,res)=>{
  req.session.destroy();
  res.session("/");
})
app.get("/profile",(req,res)=>{
  res.render("profile");
})
// app.get("/details/:id",(req,res)=>{
//   let productId=req.params.id;
//   dbinstance.collection("products").findOne({_id:new mongodb.ObjectId(productId)}).then(data=>{
//     res.render("product",{data});
//   }).catch(e=>{
//     console.log(e);
//   })
// })
app.get("/product",(req,res)=>{
  res.render("product");
})
app.listen(3000, () => {
  console.log("Server running at port 3000");
});
