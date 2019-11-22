import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

interface Video {
    title: string,
    views: number,
    likes: number,
    dislikes: number,
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
    activeVideoViews: number;
    activeVideoLikes: number;
    activeVideoDislikes: number;
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
            console.log("whoIs: " + this.whoIs);
            console.log("drones: " + this.drones);
            console.log("ces: " + this.ces);
            document.getElementById("drones").classList.remove("selected");
            document.getElementById("ces").classList.remove("selected");
        }
        else if (id == "drones") {
            this.drones = true;
            this.whoIs = false;
            this.ces = false;
            console.log("whoIs: " + this.whoIs);
            console.log("drones: " + this.drones);
            console.log("ces: " + this.ces);
            document.getElementById("whoIs").classList.remove("selected");
            document.getElementById("ces").classList.remove("selected");
        }
        else if (id == "ces") {
            this.ces = true;
            this.drones = false;
            this.whoIs = false;
            console.log("whoIs: " + this.whoIs);
            console.log("drones: " + this.drones);
            console.log("ces: " + this.ces);
            document.getElementById("whoIs").classList.remove("selected");
            document.getElementById("drones").classList.remove("selected");
        }
    }

    constructor(private cookie: CookieService) { }

    ngOnInit() {
        this.WhoIs24G = {
            title: "Who is 24G?",
            views: 24,
            likes: 20,
            dislikes: 1,
            id: 'whoIs'
        }

        this.FutureOfDrones = {
            title: "Future Of Drones",
            views: 67,
            likes: 34,
            dislikes: 2,
            id: 'drones'
        }

        this.CESOverview = {
            title: "CES Overview",
            views: 12,
            likes: 3,
            dislikes: 3,
            id: 'ces'
        }

        this.setActiveVideo(this.WhoIs24G, "whoIs"); // WhoIs24G will be active by default
  }

}
