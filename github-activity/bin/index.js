#!/usr/bin/env node
const {Command} = require('commander')
const program = new Command()
const axios = require('axios')
program
    .name('github-activity')
    .description('CLI to fetch the recent activity of a GitHub user and display it in the terminal')
    .version('0.1.0')
program
    .argument('<github-username>')
    .action((username) => {
        axios.get(`https://api.github.com/users/${username}/events`)
        .then(response => {
            if (response.data.length == 0){
                console.log("No recent activity")
            }
            else{
            for(let i = 0;i < response.data.length;i++){
                if (response.data[i].type == "IssuesEvent"){
                    console.log(`- ${response.data[i].payload.action.charAt(0).toUpperCase() + response.data[i].payload.action.slice(1)} an issue in ${response.data[i].repo.name}`)
                }
                else if (response.data[i].type == "CommitCommentEvent"){
                    console.log(`- Commented on a commit in  ${response.data[i].repo.name}`) 
                    
                }
                else if (response.data[i].type == "CreateEvent"){
                    console.log(`- Created a ${response.data[i].payload.ref_type} in the ${response.data[i].payload.master_branch} branch of ${response.data[i].repo.name}`) 
                }
                else if (response.data[i].type == "DeleteEvent"){
                    console.log(`- Deleted a ${response.data[i].payload.ref_type} in ${response.data[i].repo.name}`) 
                }
                else if (response.data[i].type == "ForkEvent"){
                    console.log(`- Forked ${response.data[i].repo.name}`) 
                }
                else if (response.data[i].type == "GollumEvent"){
                    console.log(`- Updated wiki page in ${response.data[i].repo.name}`) 
                }
                else if (response.data[i].type == "IssueCommentEvent"){
                    console.log(`- ${response.data[i].payload.action.charAt(0).toUpperCase() + response.data[i].payload.action.slice(1)} a comment on an issue in ${response.data[i].repo.name}`) 
                    
                }
                else if (response.data[i].type == "MemberEvent"){
                    console.log(`- ${response.data[i].payload.action.charAt(0).toUpperCase() + response.data[i].payload.action.slice(1)} a collaborator to ${response.data[i].repo.name}`) 
                    
                }
                else if (response.data[i].type == "PublicEvent"){
                    console.log(`- Made ${response.data[i].repo.name} public`) 
                }
                else if (response.data[i].type == "PullRequestEvent"){
                    console.log(`- ${response.data[i].payload.action.charAt(0).toUpperCase() + response.data[i].payload.action.slice(1)} a pull request in ${response.data[i].repo.name}`) 
                }
                else if (response.data[i].type == "PullRequestReviewEvent"){
                    console.log(`- ${response.data[i].payload.action.charAt(0).toUpperCase() + response.data[i].payload.action.slice(1)} a pull request review in ${response.data[i].repo.name}`) 
                }
                else if (response.data[i].type == "PullRequestReviewCommentEvent"){
                    console.log(`- Commented on a pull request review in ${response.data[i].repo.name}`) 
                }
                else if (response.data[i].type == "PullRequestReviewThreadEvent"){
                    console.log(`- ${response.data[i].payload.action.charAt(0).toUpperCase() + response.data[i].payload.action.slice(1)} a comment thread on a pull request in ${response.data[i].repo.name}`) 
                }
                else if (response.data[i].type == "PushEvent"){
                    console.log(`- Pushed ${response.data[i].payload.size} ${response.data[i].payload.size > 1 ? "commits":"commit"} to ${response.data[i].repo.name}`) 
                }
                else if (response.data[i].type == "ReleaseEvent"){
                    console.log(`- ${response.data[i].payload.action.charAt(0).toUpperCase() + response.data[i].payload.action.slice(1)} a release in ${response.data[i].repo.name}`) 
                }
                else if (response.data[i].type == "WatchEvent"){
                    console.log(`- Starred ${response.data[i].repo.name}`) 
                }
            }
                
            }
        })
        .catch(error => {
            if (error.status == "404"){
                console.log(`\x1b[31m Github user not found {username:${username}}\x1b[0m`)
            }
            else{
                console.log(`\x1b[31m Error fetching data: ${error.status}\x1b[0m`)
            }
        })
    })
program.parse(process.argv)