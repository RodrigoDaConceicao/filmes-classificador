import CardScroller from "../components/CardScroller";
import MiniCard from "../components/MiniCard";
import "./Home.css";

export default function Home() {
    return (
        <div className="home-container">
            <h2>Home</h2>
            <CardScroller title="Filmes mais Recentes">
                <MiniCard id={1} title="velozes e furiosos" averageScore={5} posterPath="/gqY0ITBgT7A82poL9jv851qdnIb.jpg"/>
                <MiniCard id={2} title="velozes e furiosos" averageScore={5} posterPath="/gqY0ITBgT7A82poL9jv851qdnIb.jpg"/>
                <MiniCard id={3} title="velozes e furiosos" averageScore={5} posterPath="/gqY0ITBgT7A82poL9jv851qdnIb.jpg"/>
                <MiniCard id={4} title="velozes e furiosos" averageScore={5} posterPath="/gqY0ITBgT7A82poL9jv851qdnIb.jpg"/>
                <MiniCard id={5} title="velozes e furiosos" averageScore={5} posterPath="/gqY0ITBgT7A82poL9jv851qdnIb.jpg"/>
                <MiniCard id={6} title="velozes e furiosos" averageScore={5} posterPath="/gqY0ITBgT7A82poL9jv851qdnIb.jpg"/>
                <MiniCard id={7} title="velozes e furiosos" averageScore={5} posterPath="/gqY0ITBgT7A82poL9jv851qdnIb.jpg"/>
                <MiniCard id={8} title="velozes e furiosos" averageScore={5} posterPath="/gqY0ITBgT7A82poL9jv851qdnIb.jpg"/>
                <MiniCard id={9} title="velozes e furiosos" averageScore={5} posterPath="/gqY0ITBgT7A82poL9jv851qdnIb.jpg"/>
                <MiniCard id={10} title="velozes e furiosos" averageScore={5} posterPath="/gqY0ITBgT7A82poL9jv851qdnIb.jpg"/>
            </CardScroller>
        </div>
    )
}