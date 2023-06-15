// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract Dao { 

     uint256 private TotalMembers;
     address[] private members;
     mapping(string=>proposal) public proposals;
     address immutable owner;
     enum Status {
        notCreated,
        created,
        Rewarded
    }
     struct proposal{
         string requirement;
         uint256 maxMembers;
         uint256 currentCount;
         mapping(address=>string[]) commits;
         uint256 reward;
         Status initialized;
     }

     constructor(){
         owner = msg.sender;
     }
    /**
     * @dev Number of Members
     * @return value of 'TotalMembers'
     */
    function getTotalMembers() view public returns(uint256) {
        return TotalMembers;
    }

     /**
     * @dev Get the commits of a particular Member
     * @param _memberAddr Address of the Member whose Commits have to be fetched
     * @param _proposalId Proposal ID of the proposal where commits need to be viewd
     * @return value of 'TotalMembers'
     */
    function getCommits(address _memberAddr,string calldata _proposalId) view public returns( string [] memory) {
       return proposals[_proposalId].commits[_memberAddr];
    }
    /**
     * @dev Get the commits of a particular Member
     * @return value of 'members'
     */
    function getAllMembers() view public returns(address[] memory ) {
       return members;
    }

     /**
     * @dev Get the commits of a Proposal details
     * @return value of 'members'
     */
    function getProposalDetails(string calldata _proposalId) view public returns(string memory,uint256,uint256,uint256 ) {
       return (proposals[_proposalId].requirement,proposals[_proposalId].maxMembers,proposals[_proposalId].currentCount,proposals[_proposalId].reward);
    }






    /**
     * @dev Add a member to the Dao
     * @param _newMember Address of the New Member
     */
    function addMember(address _newMember)  internal {
        members.push(_newMember);
    }

    /**
     * @dev Add a new Proposal to the Dao
     * @param _proposalId Id of the proposal Being created
     * @param _required The requirements of the proposal Being created
     */
    function  createProposal(string calldata _proposalId,string calldata _required, uint256 _maxMembers, uint256 _rewardAmount) public payable {
        require(proposals[_proposalId].initialized == Status.notCreated, "Proposal already initialized for the given key");
        require(_rewardAmount==msg.value,"You need to lock more tokens");
         proposal storage t = proposals[_proposalId];
         t.requirement=_required;
         t.maxMembers = _maxMembers;
         t.initialized=Status.created;
         t.reward = _rewardAmount;
    }

     /**
     * @dev Add a new Proposal to the Dao
     * @param _proposalID Id of the proposal Being created
     * @param _commitData IPFS link of the data commited
     */
    function commitData(string calldata _proposalID,string calldata _commitData) public {
         proposal storage t = proposals[_proposalID];
         require(t.currentCount<=t.maxMembers,"Max capacity Reached");
         require(t.commits[msg.sender].length==0,"Already Contributed");
         t.commits[msg.sender].push(_commitData);
         t.currentCount=t.currentCount+1;
         TotalMembers=TotalMembers+1;
         addMember(msg.sender);
    }

    /**
     * @dev Add a new Proposal to the Dao
     * @param _proposalID Id of the proposal Being created
     */
    function rewardMembers(string calldata _proposalID) public {
        require(msg.sender==owner,"Only owner can do this");
        require(proposals[_proposalID].initialized == Status.created, "Proposal already Rewarded for the given key");
         proposal storage t = proposals[_proposalID];
         uint256 rewardPerPerson = t.reward/members.length;
         for(uint256 i=0;i<members.length;i++){
             payable(members[i]).transfer(rewardPerPerson);
         }
         proposals[_proposalID].initialized=Status.Rewarded;
    }
  
}