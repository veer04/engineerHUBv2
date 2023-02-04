import "./Udaan.css";
import Accordion from "react-bootstrap/Accordion";
import UDAAN from './udaan.jpg';
import mentor from './mentor.jpg';
import Courses from "../HomeCourses/Courses";


import "swiper/css/pagination";

import "swiper/css";
import "swiper/css/autoplay";
const Udaan = () => {
 
  return (
<>
<div className="containerccc">
    <div className="upperContainer row">
        
            <div className="col-lg-6">
            <div className="leftPart">
            <h1 className="udaanHead1">UDAAN</h1>
            <h1 className="udaanHead2">DSA Course</h1>
           
            <p className="udaantxt mt-3">Ace the coding Interviews- Step by step guide for their toughest questions.</p>
            <p className="udaantxt mt-3">Understand Data Structures inner mechanism and design decision effects + solve 180+ problems to enhance your problem solving.</p>
           <div className="row mt-5">
            <div className="col-lg-2 ">
            <img src={mentor} className="mentorImageDSA"alt="" />
            </div>
            <div className="col-lg-6 ">
            <p className="mentorinfodisplay">By Rigved Kumar </p>
            <p className="mentorinfodisplay">SDE Microsoft</p>
            </div>
           </div>
            </div>
            </div>
            <div className="col-lg-6 ">
            <div className="rightPart">
            <div className="card_Left">
              <div className="imagePoster">
                <img src={UDAAN}
                 className="PosterImageStyling" 
                
                  alt="" />
              </div>
              <div className="body_content">
              <ul>
                <li className="overviewList listtxt">
                  Live sessions
                </li>
                <li className="overviewList listtxt">Practise FAANG questions</li>
                <li className="overviewList listtxt">Mock Coding Assessment</li>
              </ul>
              <a href="https://forms.gle/dqjfM7vGZzaBCgbNA">
                <button className="registerUdaan" >
              Register
            </button>
            </a>
            
               
               
       
              </div>
            </div>
            </div>
            </div>
      
    </div>
    <div className="row ">
      <div className="col-lg-1"></div>
      <div className="col-lg-5 overview" id="overview">
        <h2 className="TopicsHeader">An Overview</h2>
      <ul>
        <li className="overviewList">Weekly Live Classes on Friday, Saturday and Sunday</li>
        <li  className="overviewList">Practice 180+ interview questions</li>
        <li  className="overviewList">Get individual mentorship and support from the mentors</li>
        <li  className="overviewList">Offering in 3:4 ratio 3 live classes and 4 days practice a week</li>
      </ul>
      </div>
      <div className="col-lg-6"></div>
    </div>
    <div className="row MiddleAccordian for syllabus">
      <div className="col-lg-1 ">
        
      </div>
      <div className="col-lg-4">
    <h3 className="TopicsHeader textudaaan1">About the Mentor</h3>
    <div className="mentordetailCard">
      <img src={mentor} className="imageOfTheMentor" alt="" />
            <div className="mentordetail">
            <h4 className="udaantext">Rigved Kumar</h4>
            
            <ul>
              <li className="listRig">Rigved is currently a software development engineer at Microsoft
                </li><li className="listRig"> He has an industry experience of about 4 years.
                </li>
                
              <li className="listRig">Mentored students preparing for IOITC.</li>
              <li className="listRig">Former Teaching Assistant at Coding Ninjas</li>
            </ul>
            </div>
    </div>

    </div>
      <div className="col-lg-5 leftoutpart">
        <h2 className="udaantext textudaaan1 textudaan2">Course Contents</h2>
    <Accordion defaultActiveKey="0">
      <Accordion.Item className="accordiandata" eventKey="0">
        <Accordion.Header>Intro to Arrays and prefix sum</Accordion.Header>
        <Accordion.Body>
        Complete understanding of arrays and prefix sum
        Practice Session: Covering variety of concepts and Medium to Hard Leetcode questions
        Bonus : Most frequently asked in FAANG
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item  className="accordiandata"  eventKey="1">
        <Accordion.Header>Maths and Bit Manipulation</Accordion.Header>
        <Accordion.Body>
        Complete understanding of math and bit manipulation concepts
Practice Session: Covering variety of concepts and Medium to Hard Leetcode questions
Bonus : Solve bit manipulation interview problems
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item  className="accordiandata"  eventKey="2">
        <Accordion.Header>- Intro to Strings</Accordion.Header>
        <Accordion.Body>
        Complete understanding of String. Practice Session
Bonus : Solving string matching algorithms as well
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item  className="accordiandata"  eventKey="3">
        <Accordion.Header>Searching and Sorting</Accordion.Header>
        <Accordion.Body>
        Introduction and implementation
Interview Based Problems
Bonus : Master Divide and Conquer approach
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item  className="accordiandata"  eventKey="4">
        <Accordion.Header>Recursion - Part 1</Accordion.Header>
        <Accordion.Body>
        What is recursion, how to analyse recursion
Understanding code flow of a recursive call with examples
Time and space complexity of recursive calls
Problem solving session
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item  className="accordiandata"  eventKey="5">
        <Accordion.Header>Recursion and Backtracking - Part 2</Accordion.Header>
        <Accordion.Body>
        Double Recursion : More Complex examples involving recursion calls
Intro to Backtracking and maze problems - Theory + Code + Tips
Bonus : Common patterns asked in coding interviews
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item  className="accordiandata"  eventKey="6">
        <Accordion.Header> Linked Lists</Accordion.Header>
        <Accordion.Body>
          <ul>
            <li>
            Merge Two sorted Linked Lists
            </li>
            <li>
            K-Group Linked Lists, etc
            </li>
            <li>
            Merge Sort of linked list
            </li>
          </ul>
     Bonus : Discussion of top product companies interview questions based on DLL, Linked Lists
      
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item  className="accordiandata"  eventKey="7">
        <Accordion.Header>Stack and queues</Accordion.Header>
        <Accordion.Body>
        Complete understanding of stack and queues
Problem Solving Session
Bonus : Stack and Queue based interview questions
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item  className="accordiandata"  eventKey="8">
        <Accordion.Header>Heap and priority queue</Accordion.Header>
        <Accordion.Body>
        Heap and priority Queue overview :-
        <ul>
          <li>
          Implementation of priority queue
          </li>
          <li>
           Insert, delete and peek operation in priority queue
          </li>
           <li>
           
           Binary heap time complexity of building a heap
           What is heap, min-heap and max-heap introduction, approach
          </li>
          <li>
           Min heap, max heap implementation
          </li>
          <li>Interview problems based on min max heap</li>
          Bonus : Discussion of top product companies interview questions based on Heap and Priority Queue
        </ul>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item  className="accordiandata"  eventKey="9">
        <Accordion.Header>Binary Tree and BST - Part 1</Accordion.Header>
        <Accordion.Body>
        Introduction and analysis of binary tree
Binary Tree Traversals
Interview Questions on Binary Trees.
        </Accordion.Body>
      </Accordion.Item>
          <Accordion.Item  className="accordiandata"  eventKey="10">
        <Accordion.Header>Binary Tree and BST - Part 2</Accordion.Header>
        <Accordion.Body>
        Introduction to BST
Interview questions on BST
Bonus : Introduction to Advanced Tree (B-Tree, B+ Tree, N-ary tree and problems)
        </Accordion.Body>
      </Accordion.Item>    <Accordion.Item  className="accordiandata"  eventKey="11">
        <Accordion.Header>- Hashing and map</Accordion.Header>
        <Accordion.Body>
        Introduction to Hashtable, functions and hashing techniques
Hashing : Problem and Solution
Design and implement LRU
Bonus : Interview questions on hashing and maps
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item  className="accordiandata"  eventKey="12">
        <Accordion.Header>Tries</Accordion.Header>
        <Accordion.Body>
        Introduction and implementation
Bonus : Interview Problems based on Tries
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item  className="accordiandata" eventKey="13">
        <Accordion.Header>DP - Part 1</Accordion.Header>
        <Accordion.Body>
        Introduction to Dynamic Programming
Build a strong foundation of DP memoization and tabulation techniques
Implementation by solving problems
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item  className="accordiandata"  eventKey="14">
        <Accordion.Header>DP - Part 2</Accordion.Header>
        <Accordion.Body>
        Master DP with standard interview problems 
        like LCS, coin change, LIS and egg dropping
         problemandtheir variations

        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item className="accordiandata"  eventKey="15">
        <Accordion.Header> DP - Part 3</Accordion.Header>
        <Accordion.Body>
        Bonus:
        <ul>
          <li>
          Advanced problem solving
          </li>
          <li>
          Interview based problems
          </li>
        </ul>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item className="accordiandata"  eventKey="16">
        <Accordion.Header> Graphs - Part 1</Accordion.Header>
        <Accordion.Body>
        Introduction and applications
Graph Representation - Adjacency List and traversal
BFS, DFS - Implementation and Application
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item className="accordiandata"  eventKey="17">
        <Accordion.Header> Graphs - Part 2</Accordion.Header>
        <Accordion.Body>
        Problems based on BFS and DFS
Shortest path algorithms
Bonus : Medium to advanced interview questions on BFS and DFS
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item  className="accordiandata" eventKey="18">
        <Accordion.Header> Miscellaneous Problems Solving and Doubt Session</Accordion.Header>
        <Accordion.Body>
 
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item className="accordiandata"  eventKey="19">
        <Accordion.Header> - Mock Coding Assessment</Accordion.Header>
        <Accordion.Body>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item className="accordiandata"  eventKey="20">
        <Accordion.Header> - Solution and Discussion of assessment</Accordion.Header>
        <Accordion.Body>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </div>
    <div className="col-1"></div>
  
    </div>

<div className="coursesIntheUdaanPage udaancours">
  <Courses ></Courses>
</div>
{/* <div className="row">
<Swiper
            modules={[Autoplay]}
            loop={true}
            autoplay={{ delay: 4000 }}
            breakpoints={{
              768: {
                width: 700,
                slidesPerView: 2,
              },
              1024: {
                width: 940,
                slidesPerView: 3,
              },
              1440: {
                width: 1290,
                slidesPerView: 4,
              },
            }}
            onSwiper={() => {}}
            onSlideChange={() => {}}
          >
            {coursesData.map((c, i) => (
              <SwiperSlide>
                <CoursesCard
                  key={i * 20}
                  id={i * 2}
                  courseName={c.courseName}
                  state={c}
                  cardImage={c.cardImage}
                  courseTitle1={c.courseTitle1}
                  courseTitle2={c.courseTitle2}
                  courseDescription={c.courseDescription}
                  lastDate={c.lastDate}
                />
              </SwiperSlide>
            ))}
          </Swiper>
</div> */}
</div>
</>
  )
}

export default Udaan