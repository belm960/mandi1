import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {GroupInfo} from '../models/groupInfo';
import {apiUrl} from '../../environments/environment';
import { AddInfo } from '../models/addInfo';
import { Comments } from '../models/comments';
import { LikeDislike } from '../models/likeDislike';
import { PostComemnt } from '../models/PostComment';
import { TokenStorageService } from '../shared/security/token-storage.service';
import { SharedPost } from '../models/sharedpost';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
    providedIn: 'root'
})
export class AddGroupService {

    private groupUrl = `${apiUrl}/group/Groupe`;
    private groupsUrl = `${apiUrl}/group/Group`;
    private addUrl = `${apiUrl}/add/Add`;
    private comurl= `${apiUrl}/comment/Comment`;
    private likeUrl = `${apiUrl}/LikeDislike`;
    private MyaddUrl = `${apiUrl}/add/MyAdd`;
    private postCommentUrl =`${apiUrl}/pComment`;
    private sellProduct = `${apiUrl}/add/MySellAdd/`;
    private shareProduct = `${apiUrl}/PerShare/detaill/`;
    private SharedUrl = `${apiUrl}/PerShare`;

    constructor(private http: HttpClient, private token: TokenStorageService) {
    }

    getAllInPage(page: number, size: number): Observable<any> {
        const url = `${this.groupUrl}`;
        return this.http.get(url)
            .pipe(
                // tap(_ => console.log(_)),
            )
    }
    getSelledProducts(){
        return  this.http.get(this.sellProduct+ this.token.getId())
    }
    getSharedProducts(){
        return  this.http.get(this.shareProduct+ this.token.getId())
    }
    getAllInPageofAdd(page: number, size: number): Observable<any> {
        const url = `${this.addUrl}?page=${page}&size=${size}`;
        return this.http.get(url)
            .pipe(
                // tap(_ => console.log(_)),
            )
    }
    getAllInPageofMyAdd(ownerId: string): Observable<any> {
        const url = `${this.MyaddUrl}/${ownerId}`;
        return this.http.get(url)
            .pipe(
                // tap(_ => console.log(_)),
            )
    }
    getDetail(id: String): Observable<GroupInfo> {
        const url = `${this.groupsUrl}/${id}`;
        return this.http.get<GroupInfo>(url).pipe(
            catchError(_ => {
                console.log("Get Detail Failed");
                return of(new GroupInfo());
            })
        );
    }
    getDetails(id: String): Observable<AddInfo> {
        const url = `${this.addUrl}/${id}`;
        return this.http.get<AddInfo>(url).pipe(
            catchError(_ => {
                console.log("Get Detail Failed");
                return of(new AddInfo());
            })
        );
    }
    getPostComments(id: String): Observable<PostComemnt> {
        const url = `${this.postCommentUrl}/PCommentByP/${id}`;
        return this.http.get<PostComemnt>(url).pipe(
            catchError(_ => {
                console.log("Get Detail of Comment Failed");
                return of(new PostComemnt());
            })
        );
    }
    PostComment(comment,memid,pid){
        const url = `${this.postCommentUrl}/PComment/`;
        return this.http.post(url, {"comment": comment,"members_id": memid, "posts_id": pid});
    }

    getLikeDislike(mem:string, post: string): Observable<LikeDislike> {
        const url = `${this.likeUrl}/${mem}/get/${post}`;
        return this.http.get<LikeDislike>(url).pipe(
            catchError((error:HttpErrorResponse)=> {
                console.log("Get Detail Failed");
                window.localStorage.setItem('errork',"true")
                return of(new LikeDislike());
            })
        );
    }

    getshare(mem:string, post: string): Observable<SharedPost> {
        const url = `${this.SharedUrl}/${mem}/get/${post}`;
        return this.http.get<SharedPost>(url).pipe(
            catchError((error:HttpErrorResponse)=> {
                console.log("Get Detail Failed");
                window.localStorage.setItem('errork',"true")
                return of(new SharedPost());
            })
        );
    }
    update(groupInfo: GroupInfo): Observable<GroupInfo> {
        const url = `${apiUrl}/seller/product/${groupInfo.id}/edit`;
        return this.http.put<GroupInfo>(url, groupInfo, httpOptions);
    }
    updateadd(addInfo: AddInfo,id: string): Observable<AddInfo> {
        const url = `${apiUrl}/add/Add/${id}`;
        return this.http.put<AddInfo>(url, addInfo, httpOptions);
    }
    updateaddLikeDislike(mem,post,likes,dislikes){
        const url = `${apiUrl}/LikeDislike/${mem}/${post}`;
        const urll = `${apiUrl}/LikeDislike/`;
        return this.http.put(url,{
            "members_id":mem,
            "posts_id":post,
            "likes": likes,
            "dislikes": dislikes
        }, httpOptions).subscribe(
            data => {
                console.log(data);
            },
            (error:HttpErrorResponse)=>{
                if(error.status==404){
                    return this.http.post(urll,{
                        "members_id":mem,
                        "posts_id":post,
                        "likes": likes,
                        "dislikes": dislikes
                    }, httpOptions).subscribe(
                        data => {
                            console.log(data);
                        });
                }
            
            }
        );
    }
    updateNumberOfUsage(mem,post,num){
        const url = `${apiUrl}/NumOfUsage/${mem}/${post}`;
        const urll = `${apiUrl}/NumOfUsage/`;
        return this.http.put(url,{
            "numUsage": num,
        }, httpOptions).subscribe(
            data => {
                console.log(data);
            },
            (error:HttpErrorResponse)=>{
                if(error.status==404){
                    return this.http.post(urll,{
                        "members_id":mem,
                        "posts_id":post,
                        "numUsage": num,
                    }, httpOptions).subscribe(
                        data => {
                            console.log(data);
                        });
                }
            
            }
        );
    }
    updateNumberOfShare(mem,post,num){
        const url = `${apiUrl}/NumOfShare/${mem}/${post}`;
        const urll = `${apiUrl}/NumOfShare/`;
        return this.http.put(url,{
            "numOfShare": num,
        }, httpOptions).subscribe(
            data => {
                console.log(data);
            },
            (error:HttpErrorResponse)=>{
                if(error.status==404){
                    return this.http.post(urll,{
                        "members_id":mem,
                        "posts_id":post,
                        "numOfShare":1,
                    }, httpOptions).subscribe(
                        data => {
                            console.log(data);
                        });
                }
            
            }
        );
    }
    updateAddLike(numOfLike: number,id){
        const url = `${apiUrl}/add/Add/Like/${id}`;
        return this.http.put<AddInfo>(url, {"numOfLike": numOfLike}, httpOptions);
    }
    updateAddDislike(numOfDislike: number,id){
        const url = `${apiUrl}/add/Add/Dislike/${id}`;
        return this.http.put<AddInfo>(url, {"numOfDislike": numOfDislike}, httpOptions);
    }
    updateAddLikeDislike(numOfLike: number,numOfDislike: number,id){
        const url = `${apiUrl}/add/Add/Like/Dislike/${id}`;
        return this.http.put<AddInfo>(url, {"numOfLike": numOfLike,"numOfDislike": numOfDislike}, httpOptions);
    }
    create(groupInfo: GroupInfo): Observable<GroupInfo> {
        const url = `${apiUrl}/seller/product/new`;
        return this.http.post<GroupInfo>(url, groupInfo, httpOptions);
    }
    createadd(addInfo: AddInfo): Observable<AddInfo> {
        const url = `${apiUrl}/add/Add/`;
        return this.http.post<AddInfo>(url, addInfo, httpOptions);
    }


    delelte(groupInfo: GroupInfo): Observable<any> {
        const url = `${apiUrl}/seller/product/${groupInfo.id}/delete`;
        return this.http.delete(url);
    }

    createComment(comment: Comments): Observable<Comments> {
        const url = `${apiUrl}/comment/Comment/`;
        return this.http.post<Comments>(url, comment);
    }

    getAllComment(): Observable<any> {
        return this.http.get(this.comurl)
            .pipe(
                // tap(_ => console.log(_)),
            )
    }
}
