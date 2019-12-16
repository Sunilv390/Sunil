const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const helmet=require('helmet');
const morgan=require('morgan');
const app=express();
const ads=[
{
	title:'Hello, World (again)'
}];
const{startDatabase}=require('./database/mongo');
const{insertAd,getAds}=require('./database/ads');
const{deleteAd,updateAd}=require('./database/ads');
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));
app.get('/',async (req,res)=>{
	res.send(await getAds());
});
app.post('/',async(req,res)=>{
	const newAd=req.body;
	await insertAd(newAd);
	res.send({message:'New ad inserted.'});
});
app.delete('/:id',async(req,res)=>{
	await deleteAd(req.params.id);
	res.send({message:'Ad removed.'});
});
app.put('/:id',async(req,res)=>{
	const updateAd=req.body;
	await updateAd(req.params.id,updatedAd);
	res.send({message:'Ad updated.'});
});
startDatabase().then(async()=>{
	await insertAd({
		name: "Harry Potter and the Order of the Phoenix",
	    img: "https://bit.ly/2IcnSwz",
	    summary: "Harry Potter and Dumbledore's warning about the return of Lord Voldemort is not heeded by the wizard authorities who, in turn, look to undermine Dumbledore's authority at Hogwarts and discredit Harry."
});
	await insertAd({
		name: "The Lord of the Rings: The Fellowship of the Ring",
	    img: "https://bit.ly/2tC1Lcg",
	    summary: "A young hobbit, Frodo, who has found the One Ring that belongs to the Dark Lord Sauron, begins his journey with eight companions to Mount Doom, the only place where it can be destroyed."
});
	await insertAd({
		name: "Avengers: Endgame",
	    img: "https://bit.ly/2Pzczlb",
	    summary: "Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe."
});

app.listen(3001, async () => {
	console.log('listening on port 3001');
});
});
