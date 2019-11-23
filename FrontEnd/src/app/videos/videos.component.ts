import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

interface Video {
    title: string,
    views: string,
    likes: string,
    dislikes: string,
    id: string,
}

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
    @ViewChild('activeVideo', { static: true } ) active;

    activeVideoTitle: string;
    activeVideoViews: string;
    activeVideoLikes: string;
    activeVideoDislikes: string;
    activeVideoId: string;
    activeVideoSrc: string;

    whoIs: boolean;
    drones: boolean;
    ces: boolean;

    WhoIs24G: Video;
    FutureOfDrones: Video;
    CESOverview: Video;

    updateActiveVideo(videoTitle: string) {
        if (videoTitle == 'FutureOfDrones')
            this.setActiveVideo(this.FutureOfDrones, "drones")
        else if (videoTitle == 'CESOverview')
            this.setActiveVideo(this.CESOverview, "ces")
        else if (videoTitle == 'WhoIs24G')
            this.setActiveVideo(this.WhoIs24G, "whoIs")
        else
            console.log('Invalid Video Selection');
    }

    // Changes which video is active 
    setActiveVideo(video: Video, id: string): void {
        this.activeVideoTitle = video.title;
        this.activeVideoViews = video.views;
        this.activeVideoLikes = video.likes;
        this.activeVideoDislikes = video.dislikes;
        this.applySelectClass(id);
    }

    applySelectClass(id: string) {
        document.getElementById(id).className = "selected";

        if (id == "whoIs") {
            this.whoIs = true;
            this.drones = false;
            this.ces = false;
            document.getElementById("drones").classList.remove("selected");
            document.getElementById("ces").classList.remove("selected");
        }
        else if (id == "drones") {
            this.drones = true;
            this.whoIs = false;
            this.ces = false;
            document.getElementById("whoIs").classList.remove("selected");
            document.getElementById("ces").classList.remove("selected");
        }
        else if (id == "ces") {
            this.ces = true;
            this.drones = false;
            this.whoIs = false;
            document.getElementById("whoIs").classList.remove("selected");
            document.getElementById("drones").classList.remove("selected");
        }
    }

    // Increment "liked" cookie for active video
    likedVideo(): void {
        if (this.whoIs) {
            this.WhoIs24G.likes = (parseInt(this.WhoIs24G.likes) + 1).toString();
            this.cookie.set('whoIsLikesCookie', this.WhoIs24G.likes);
        }
        else if (this.drones) {
            this.FutureOfDrones.likes = (parseInt(this.FutureOfDrones.likes) + 1).toString();
            this.cookie.set('dronesLikesCookie', this.FutureOfDrones.likes);
        }
        else if (this.ces) {
            this.CESOverview.likes = (parseInt(this.CESOverview.likes) + 1).toString();
            this.cookie.set('cesLikesCookie', this.CESOverview.likes);
        }
    }

    // Increment "disliked" cookie for active video
    dislikedVideo(): void {
        if (this.whoIs) {
            this.WhoIs24G.dislikes = (parseInt(this.WhoIs24G.dislikes) + 1).toString();
            this.cookie.set('whoIsDislikesCookie', this.WhoIs24G.dislikes);
        }
        else if (this.drones) {
            this.FutureOfDrones.dislikes = (parseInt(this.FutureOfDrones.dislikes) + 1).toString();
            this.cookie.set('dronesDislikesCookie', this.FutureOfDrones.dislikes);
        }
        else if (this.ces) {
            this.CESOverview.dislikes = (parseInt(this.CESOverview.dislikes) + 1).toString();
            this.cookie.set('cesDislikesCookie', this.CESOverview.dislikes);
        }
    }

    // Increment "views" cookie for completed video
    viewedVideo(): void {
        if (this.whoIs) {
            this.WhoIs24G.views = (parseInt(this.WhoIs24G.views) + 1).toString();
            this.cookie.set('whoIsViewsCookie', this.WhoIs24G.views);
        }
        else if (this.drones) {
            this.FutureOfDrones.views = (parseInt(this.FutureOfDrones.views) + 1).toString();
            this.cookie.set('dronesViewsCookie', this.FutureOfDrones.views);
        }
        else if (this.ces) {
            this.CESOverview.views = (parseInt(this.CESOverview.views) + 1).toString();
            this.cookie.set('cesViewsCookie', this.CESOverview.views);
        }
    }

    constructor(private cookie: CookieService) { }

    ngOnInit() {

        // If no cookie exists, set value to 0

        if (!this.cookie.get('whoIsViewsCookie')) {
            this.cookie.set('whoIsViewsCookie', "0")
        }

        if (!this.cookie.get('whoIsLikesCookie')) {
            this.cookie.set('whoIsLikesCookie', "0")
        }

        if (!this.cookie.get('whoIsDislikesCookie')){
            this.cookie.set('whoIsDislikesCookie', "0")
        }

        if (!this.cookie.get('dronesViewsCookie')) {
            this.cookie.set('dronesViewsCookie', "0")
        }

        if (!this.cookie.get('dronesLikesCookie')) {
            this.cookie.set('dronesLikesCookie', "0")
        }

        if (!this.cookie.get('dronesDislikesCookie')) {
            this.cookie.set('dronesDislikesCookie', "0")
        }

        if (!this.cookie.get('cesViewsCookie')) {
            this.cookie.set('cesViewsCookie', "0")
        }

        if (!this.cookie.get('cesLikesCookie')) {
            this.cookie.set('cesLikesCookie', "0")
        }

        if (!this.cookie.get('cesDislikesCookie')) {
            this.cookie.set('cesDislikesCookie', "0")
        }

        this.WhoIs24G = {
            title: "Who is 24G?",
            views: this.cookie.get('whoIsViewsCookie'),
            likes: this.cookie.get('whoIsLikesCookie'),
            dislikes: this.cookie.get('whoIsDislikesCookie'),
            id: 'whoIs'
        }

        this.FutureOfDrones = {
            title: "Future Of Drones",
            views: this.cookie.get('dronesViewsCookie'),
            likes: this.cookie.get('dronesLikesCookie'),
            dislikes: this.cookie.get('dronesDislikesCookie'),
            id: 'drones'
        }

        this.CESOverview = {
            title: "CES Overview",
            views: this.cookie.get('cesViewsCookie'),
            likes: this.cookie.get('cesLikesCookie'),
            dislikes: this.cookie.get('cesDislikesCookie'),
            id: 'ces'
        }

        console.log("Who Is Views: " + this.cookie.get('whoIsViewsCookie'));
        console.log("Who Is Likes: " + this.cookie.get('whoIsLikesCookie'));
        console.log("Who Is Dislikes: " + this.cookie.get('whoIsDislikesCookie'));
        console.log("Drones Views: " + this.cookie.get('dronesViewsCookie'));
        console.log("Drones Likes: " + this.cookie.get('dronesLikesCookie'));
        console.log("Drones Dislikes: " + this.cookie.get('dronesDislikesCookie'));
        console.log("CES Views: " + this.cookie.get('cesViewsCookie'));
        console.log("CES Likes: " + this.cookie.get('cesLikesCookie'));
        console.log("CES Dislikes: " + this.cookie.get('cesDislikesCookie'));

        this.setActiveVideo(this.WhoIs24G, "whoIs"); // WhoIs24G will be active by default
  }

}
