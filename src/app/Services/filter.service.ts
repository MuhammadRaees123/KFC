import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  
  private BranchapiUrl = 'http://localhost:41420/api/OrderDetails/GetUserBranchList';
  private StatusapiUrl = 'http://localhost:41420/api/OrderDetails/GetRiderSettingDDValues';
  private BranchRiderapiUrl = 'http://localhost:41420/api/OrderDetails/GetDDValues';
  private AreaCoachURL = 'http://localhost:41420/api/OrderDetails/GetAreaCoachByRegion';
  private AreaCoachBranchesURL = 'http://localhost:41420/api/OrderDetails/GetAreaCoachBranches';
  //api/OrderDetails/GetUserBranchList/GetRiderSettingDDValues/GetDDValues/GetAreaCoachByRegion/GetAreaCoachBranches

  constructor(private http: HttpClient, private Loginservice: LoginService) { }

  GetBranchlist(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Loginservice.getToken()}`
      //'Authorization': 'Bearer GtAENg5umkH7bebw_o3ysLbwZNB7q2rHcgm2czUbaV_H3UkhzdukEFHNkB94cP7wo-p_NqBD86Fju5DxWc1AtsUZMDgRvcaH8jTPH4FG0ZQdxWcbV35UIOHXGCpgvCtyWVy_bWCmqSmbPMdPXHTArqp_HpkiRuAlAYV6eQ39gPcPEYPnqXn5c5BU2Q7RHTPcOjBUuEyy2iUEC3I8zSPzvvjcJneP5_7iTuxKUwb3pLC8cigOaIM1YD0s9mB_PsDVESwHjX7UhlYLP9fBAJtRs-Bp938su4fqBZf-Dt6m67Z-jl7H3aQsoNleesPYH-_j4S6Wr-zBKlAipcqDEl37ZjYlAxdawdRB-xNLEM1pARbQvQREg6zgiXjPwr-NiPLY'
    });

    return this.http.get(this.BranchapiUrl,  { headers });
  }

  // Status change Servies logic of Rider Setting
  GetStatusChange(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.Loginservice.getToken()}`
      //'Authorization': 'Bearer GtAENg5umkH7bebw_o3ysLbwZNB7q2rHcgm2czUbaV_H3UkhzdukEFHNkB94cP7wo-p_NqBD86Fju5DxWc1AtsUZMDgRvcaH8jTPH4FG0ZQdxWcbV35UIOHXGCpgvCtyWVy_bWCmqSmbPMdPXHTArqp_HpkiRuAlAYV6eQ39gPcPEYPnqXn5c5BU2Q7RHTPcOjBUuEyy2iUEC3I8zSPzvvjcJneP5_7iTuxKUwb3pLC8cigOaIM1YD0s9mB_PsDVESwHjX7UhlYLP9fBAJtRs-Bp938su4fqBZf-Dt6m67Z-jl7H3aQsoNleesPYH-_j4S6Wr-zBKlAipcqDEl37ZjYlAxdawdRB-xNLEM1pARbQvQREg6zgiXjPwr-NiPLY'
    });

    return this.http.post(this.StatusapiUrl,  { headers });
  }

    // Fetching Branch Rider Servies logic of Rider Setting
    GetBranchRider(body: any): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.Loginservice.getToken()}`
        //'Authorization': 'Bearer GtAENg5umkH7bebw_o3ysLbwZNB7q2rHcgm2czUbaV_H3UkhzdukEFHNkB94cP7wo-p_NqBD86Fju5DxWc1AtsUZMDgRvcaH8jTPH4FG0ZQdxWcbV35UIOHXGCpgvCtyWVy_bWCmqSmbPMdPXHTArqp_HpkiRuAlAYV6eQ39gPcPEYPnqXn5c5BU2Q7RHTPcOjBUuEyy2iUEC3I8zSPzvvjcJneP5_7iTuxKUwb3pLC8cigOaIM1YD0s9mB_PsDVESwHjX7UhlYLP9fBAJtRs-Bp938su4fqBZf-Dt6m67Z-jl7H3aQsoNleesPYH-_j4S6Wr-zBKlAipcqDEl37ZjYlAxdawdRB-xNLEM1pARbQvQREg6zgiXjPwr-NiPLY'
      });
  
      return this.http.post(this.BranchRiderapiUrl, body,  { headers });
    }

        // Fetching Area Coach Rider Servies logic of Rider Setting
        GetAreaCoach(body: any): Observable<any> {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.Loginservice.getToken()}`
            //'Authorization': 'Bearer GtAENg5umkH7bebw_o3ysLbwZNB7q2rHcgm2czUbaV_H3UkhzdukEFHNkB94cP7wo-p_NqBD86Fju5DxWc1AtsUZMDgRvcaH8jTPH4FG0ZQdxWcbV35UIOHXGCpgvCtyWVy_bWCmqSmbPMdPXHTArqp_HpkiRuAlAYV6eQ39gPcPEYPnqXn5c5BU2Q7RHTPcOjBUuEyy2iUEC3I8zSPzvvjcJneP5_7iTuxKUwb3pLC8cigOaIM1YD0s9mB_PsDVESwHjX7UhlYLP9fBAJtRs-Bp938su4fqBZf-Dt6m67Z-jl7H3aQsoNleesPYH-_j4S6Wr-zBKlAipcqDEl37ZjYlAxdawdRB-xNLEM1pARbQvQREg6zgiXjPwr-NiPLY'
          });
      
          return this.http.post(this.AreaCoachURL, body,  { headers });
        }

        
        // Fetching Area Coach Branches Rider Servies logic of Rider Setting
        GetAreaCoachBranches(body: any): Observable<any> {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.Loginservice.getToken()}`
            //'Authorization': 'Bearer GtAENg5umkH7bebw_o3ysLbwZNB7q2rHcgm2czUbaV_H3UkhzdukEFHNkB94cP7wo-p_NqBD86Fju5DxWc1AtsUZMDgRvcaH8jTPH4FG0ZQdxWcbV35UIOHXGCpgvCtyWVy_bWCmqSmbPMdPXHTArqp_HpkiRuAlAYV6eQ39gPcPEYPnqXn5c5BU2Q7RHTPcOjBUuEyy2iUEC3I8zSPzvvjcJneP5_7iTuxKUwb3pLC8cigOaIM1YD0s9mB_PsDVESwHjX7UhlYLP9fBAJtRs-Bp938su4fqBZf-Dt6m67Z-jl7H3aQsoNleesPYH-_j4S6Wr-zBKlAipcqDEl37ZjYlAxdawdRB-xNLEM1pARbQvQREg6zgiXjPwr-NiPLY'
          });
      
          return this.http.post(this.AreaCoachBranchesURL, body,  { headers });
        }
}
