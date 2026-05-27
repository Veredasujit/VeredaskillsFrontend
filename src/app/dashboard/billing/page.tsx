"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Download,
  CheckCircle,
  Clock,
  CreditCard,
  Search,
  Filter,
  ArrowUpDown,
  FileText,
  Receipt,
  Calendar,
  IndianRupee,
  RefreshCw,
  AlertCircle,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence, Variant, Variants } from "framer-motion";
import { useGetPaymentsByUserIdQuery } from "@/Redux/api/billingApi";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import Link from "next/link";
import InvoiceBreakdown from "@/components/dashboard/InvoiceBreakdown";

type Payment = {
  id: string;
  userId: string;
  enrollmentId: string;
  amount: string;
  status: "pending" | "paid" | "failed";
  razorpay_order_id: string;
  razorpay_payment_id: string | null;
  razorpay_signature: string | null;
  paymentDate: string | null;
  createdAt: string;
  updatedAt: string;
};

type BillingHistoryItem = {
  id: string;
  date: string;
  amount: string;
  status: "Paid" | "Pending" | "Failed";
  invoiceUrl?: string;
  razorpay_order_id: string;
  timestamp: string;
  numericAmount: number;
};

type SortOption = "newest" | "oldest" | "amount-high" | "amount-low";

export default function PaymentHistoryPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id;
  const { data: payments, error, isLoading, refetch } = useGetPaymentsByUserIdQuery(userId);
  // console.log("pa len",payments?.length || 0)
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [openInvoice, setOpenInvoice] = useState(false);

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    hover: {
      y: -2,
      scale: 1.01,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    }
  };



  const shimmerAnimation: Variant = {
    x: ["-100%", "100%"],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Format payment data for billing history
  const formatBillingHistory = (payments: Payment[]): BillingHistoryItem[] => {
    if (!payments) return [];

    return payments.map(payment => ({
      id: payment.id,
      date: new Date(payment.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      timestamp: payment.createdAt,
      amount: `₹${parseFloat(payment.amount).toLocaleString('en-IN')}`,
      numericAmount: parseFloat(payment.amount),
      status: payment.status === "paid" ? "Paid" :
        payment.status === "failed" ? "Failed" : "Pending",
      razorpay_order_id: payment.razorpay_order_id,
      invoiceUrl: payment.status === "paid" ? "#" : undefined
    }));
  };

  // Filter and sort payments
  const filteredAndSortedPayments = (payments: BillingHistoryItem[]) => {
    const filtered = payments.filter(payment => {
      const matchesSearch = payment.razorpay_order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.amount.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || payment.status.toLowerCase() === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // Sort payments
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        break;
      case "amount-high":
        filtered.sort((a, b) => b.numericAmount - a.numericAmount);
        break;
      case "amount-low":
        filtered.sort((a, b) => a.numericAmount - b.numericAmount);
        break;
    }

    return filtered;
  };

  const billingHistory = payments ? formatBillingHistory(payments) : [];
  const displayPayments = filteredAndSortedPayments(billingHistory);

  // Statistics
  const totalPaid = billingHistory.filter(p => p.status === "Paid").reduce((sum, p) => sum + p.numericAmount, 0);
  const pendingCount = billingHistory.filter(p => p.status === "Pending").length;
  const failedCount = billingHistory.filter(p => p.status === "Failed").length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/30 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-16 h-16 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CreditCard className="w-8 h-8 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Payment History
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/20 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <Card className="border-0 bg-white/90 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-gray-400/0 via-gray-400/50 to-gray-400/0"></div>

              <CardContent className="pt-12 pb-8 px-6 text-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 120, delay: 0.1 }}
                  className="mx-auto mb-6 relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200/50 rounded-full blur-md scale-110"></div>
                  <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto border border-gray-200 shadow-sm">
                    <AlertCircle className="w-12 h-12 text-gray-600" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col justify-center items-center"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    No Payment History Found
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    We couldn&apos;t find any past payments. This might be because you&apos;re new here or there was a temporary issue.
                  </p>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-left">
                    <p className="text-gray-800 text-sm font-medium flex items-start">
                      <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      <span>You haven&apos;t purchased any courses yet. Your learning journey is just a click away!</span>
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex flex-col sm:flex-row justify-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, staggerChildren: 0.1 }}
                >
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      onClick={refetch}
                      variant="outline"
                      className="gap-2 cursor-pointer border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 relative overflow-hidden"
                    >
                      <motion.div
                        animate={shimmerAnimation}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      />
                      <RefreshCw className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">Try Again</span>
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link href="/view-courses" passHref>
                      <Button className="gap-2 cursor-pointer bg-gray-800 hover:bg-gray-900 text-white shadow-lg hover:shadow-xl transition-all duration-200 relative overflow-hidden">
                        <motion.div
                          animate={shimmerAnimation}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                        />
                        <BookOpen className="w-4 h-4 relative z-10" />
                        <span className="relative z-10">Explore Our Courses</span>
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/30">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-40 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
          >
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl lg:text-4xl font-bold text-gray-900"
              >
                Payment History
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-600 mt-2"
              >
                Track and manage all your payment transactions
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <Button
                variant="outline"
                onClick={refetch}
                className="gap-2 relative overflow-hidden"
              >
                <motion.div
                  animate={shimmerAnimation}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                />
                <RefreshCw className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Refresh</span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {[
            {
              label: "Total Paid",
              value: `₹${totalPaid.toLocaleString('en-IN')}`,
              color: "green",
              icon: CheckCircle,
              bg: "from-green-50 to-green-100/50",
              border: "border-green-200/50",
              iconBg: "bg-green-100",
              iconColor: "text-green-600"
            },
            {
              label: "Pending Payments",
              value: pendingCount.toString(),
              color: "amber",
              icon: Clock,
              bg: "from-amber-50 to-amber-100/50",
              border: "border-amber-200/50",
              iconBg: "bg-amber-100",
              iconColor: "text-amber-600"
            },
            {
              label: "Failed Payments",
              value: failedCount.toString(),
              color: "red",
              icon: AlertCircle,
              bg: "from-red-50 to-red-100/50",
              border: "border-red-200/50",
              iconBg: "bg-red-100",
              iconColor: "text-red-600"
            }
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover="hover"
            >
              <Card className={`bg-gradient-to-br ${stat.bg} ${stat.border} backdrop-blur-sm cursor-pointer`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {stat.value}
                      </p>
                    </div>
                    <motion.div
                      className={`p-3 ${stat.iconBg} rounded-full`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by Order ID or amount..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/50 border-gray-300"
                  />
                </div>

                {/* Filters */}
                <div className="flex gap-3">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px] bg-white/50 border-gray-300">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                    <SelectTrigger className="w-[160px] bg-white/50 border-gray-300">
                      <ArrowUpDown className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="amount-high">Amount: High to Low</SelectItem>
                      <SelectItem value="amount-low">Amount: Low to High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment History Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Receipt className="w-5 h-5" />
                Transaction History
                <Badge variant="secondary" className="ml-2 bg-gray-100 text-gray-800">
                  {displayPayments.length} payment{displayPayments.length !== 1 ? 's' : ''}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {displayPayments.length === 0 ? (
                <div className="text-center py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CreditCard className="w-8 h-8 text-gray-400" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    {searchTerm || statusFilter !== "all" ? "No matching payments" : "No payments yet"}
                  </h3>
                  <p className="text-gray-500">
                    {searchTerm || statusFilter !== "all"
                      ? "Try adjusting your search or filters"
                      : "Your payment transactions will appear here once you make a payment."}
                  </p>
                </div>
              ) : (
                <div className="overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-gray-50/50">
                          <th className="text-left py-4 px-6 font-semibold text-gray-700">Order Details</th>
                          <th className="text-left py-4 px-6 font-semibold text-gray-700">Date & Time</th>
                          <th className="text-left py-4 px-6 font-semibold text-gray-700">Amount</th>
                          <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                          <th className="text-right py-4 px-6 font-semibold text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <AnimatePresence>
                          {displayPayments.map((payment, index) => (
                            <motion.tr
                              key={payment.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{
                                backgroundColor: "rgba(249, 250, 251, 0.8)",
                                scale: 1.01,
                                y: -1
                              }}

                              className="border-b hover:bg-gray-50/50 transition-all duration-200 group cursor-pointer"
                            >
                              <td className="py-4 px-6">
                                <div>
                                  <motion.p
                                    className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors"
                                    whileHover={{ x: 2 }}
                                  >
                                    {payment.razorpay_order_id}
                                  </motion.p>
                                  <p className="text-sm text-gray-500 mt-1">Order ID</p>
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                <motion.div
                                  className="flex items-center gap-2"
                                  whileHover={{ x: 2 }}
                                >
                                  <Calendar className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-700">{payment.date}</span>
                                </motion.div>
                              </td>
                              <td className="py-4 px-6">
                                <motion.div
                                  className="flex items-center gap-2"
                                  whileHover={{ x: 2 }}
                                >
                                  <IndianRupee className="w-4 h-4 text-green-600" />
                                  <span className="font-semibold text-green-700">{payment.amount}</span>
                                </motion.div>
                              </td>
                              <td className="py-4 px-6">
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                >
                                  {payment.status === "Paid" ? (
                                    <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100">
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                      Paid
                                    </Badge>
                                  ) : payment.status === "Failed" ? (
                                    <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-100">
                                      <AlertCircle className="w-3 h-3 mr-1" />
                                      Failed
                                    </Badge>
                                  ) : (
                                    <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">
                                      <Clock className="w-3 h-3 mr-1" />
                                      Pending
                                    </Badge>
                                  )}
                                </motion.div>
                              </td>
                              <td className="py-4 px-6 text-right">
                                <motion.div
                                  className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200"
                                  initial={{ opacity: 6, x: 10 }}
                                  whileHover={{ opacity: 5, x: 0 }}
                                >
                                  {payment.invoiceUrl && (
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                      onClick={() => setOpenInvoice(true)}
                                    >
                                      <Button variant="outline" size="sm" className="gap-1 cursor-pointer  h-8 border-gray-800">
                                        <Download className="w-3 h-3" />
                                        Invoice
                                      </Button>
                                    </motion.div>
                                  )}

                                </motion.div>
                              </td>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Empty state illustration when no data */}
        {billingHistory.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto mb-8 flex items-center justify-center">
              <CreditCard className="w-16 h-16 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Payments Yet</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              Start your learning journey by enrolling in courses. Your payment history will appear here once you make your first payment.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="gap-2 bg-gray-800 hover:bg-gray-900">
                <FileText className="w-4 h-4" />
                Browse Courses
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
      {/* Modal */}
      {openInvoice && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white  rounded-lg shadow-lg p-6 w-full max-w-md relative">

            {/* Close Button */}
            <button
              onClick={() => setOpenInvoice(false)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-900"
            >
              ✖
            </button>

            <InvoiceBreakdown
              isOpen={openInvoice}
              onClose={() => setOpenInvoice(false)}
              totalAmount={10999}

            />
          </div>
        </div>
      )}

    </div>

  );
}